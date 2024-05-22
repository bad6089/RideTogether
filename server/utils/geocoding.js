const axios = require('axios');
const locationIQKey = process.env.LOCATIONIQ_API_KEY;

const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(
      `https://eu1.locationiq.com/v1/search.php`,
      {
        params: {
          key: locationIQKey,
          q: address,
          format: 'json',
        },
      }
    );
    return response.data[0]; // Typically, you might want the first result
  } catch (error) {
    console.error('Error during geocoding:', error);
    throw error;
  }
};

const reverseGeocode = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://eu1.locationiq.com/v1/reverse.php`,
      {
        params: {
          key: locationIQKey,
          lat: lat,
          lon: lon,
          format: 'json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error during reverse geocoding:', error);
    throw error;
  }
};

module.exports = {
  geocodeAddress,
  reverseGeocode,
};
