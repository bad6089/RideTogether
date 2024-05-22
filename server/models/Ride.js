const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const rideSchema = new Schema({
  origin: {
    type: String,
    required: 'You need to provide an origin!',
    trim: true,
  },
  destination: {
    type: String,
    required: 'You need to provide a destination!',
    trim: true,
  },
  date: {
    type: String,
    required: 'You need to provide a date!',
  },
  time: {
    type: String,
    required: 'You need to provide a time!',
  },
  isDriver: {
    type: Boolean,
    required: true,
  },
  rideAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Ride = model('Ride', rideSchema);

module.exports = Ride;
