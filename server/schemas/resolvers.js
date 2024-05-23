const { User, Ride } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate({
        path: 'rides',
        populate: 'comments',
      });
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate({
        path: 'rides',
        populate: 'comments',
      });
    },
    rides: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Ride.find(params).sort({ createdAt: -1 }).populate('comments');
    },
    ride: async (parent, { rideId }) => {
      return Ride.findOne({ _id: rideId }).populate('comments');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate({
          path: 'rides',
          populate: 'comments',
        });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addRide: async (
      parent,
      { origin, destination, date, time, isDriver },
      context
    ) => {
      if (context.user) {
        const ride = await Ride.create({
          origin,
          destination,
          date,
          time,
          isDriver,
          rideAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { rides: ride._id } }
        );

        return ride;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { rideId, commentText }, context) => {
      if (context.user) {
        return Ride.findOneAndUpdate(
          { _id: rideId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeRide: async (parent, { rideId }, context) => {
      if (context.user) {
        const ride = await Ride.findOneAndDelete({
          _id: rideId,
          rideAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { rides: ride._id } }
        );

        return ride;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { rideId, commentId }, context) => {
      if (context.user) {
        return Ride.findOneAndUpdate(
          { _id: rideId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    editComment: async (
      parent,
      { rideId, commentId, commentText },
      context
    ) => {
      if (context.user) {
        const ride = await Ride.findOneAndUpdate(
          { _id: rideId, 'comments._id': commentId },
          { $set: { 'comments.$.commentText': commentText } },
          { new: true }
        );

        if (!ride) {
          throw new AuthenticationError('No ride found with this ID!');
        }

        return ride;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
