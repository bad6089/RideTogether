const db = require('../config/connection');
const { User, Ride } = require('../models');
const userSeeds = require('./userSeeds.json');
const rideSeeds = require('./rideSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Ride', 'rides');

    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < rideSeeds.length; i++) {
      const { _id, rideAuthor } = await Ride.create(rideSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: rideAuthor },
        {
          $addToSet: {
            rides: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
