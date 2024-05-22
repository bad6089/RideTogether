require('dotenv').config();
const axios = require('axios');

const locationIQKey = process.env.LOCATIONIQ_API_KEY;
const locationIQBaseURL = 'https://eu1.locationiq.com/v1/autocomplete.php';

const autocompleteAddress = async (query) => {
  try {
    const response = await axios.get(locationIQBaseURL, {
      params: {
        key: locationIQKey,
        q: query,
        normalizeaddress: 1,
        addressdetails: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching autocomplete data:', error);
    throw error;
  }
};

module.exports = {
  autocompleteAddress,
};


// Testing code
if (require.main === module) {
    // Only run this block if the file is run directly from Node, not when imported
    const testAddress = '1600 Amphitheatre Parkway, Mountain View, CA';
    autocompleteAddress(testAddress)
        .then(data => console.log(data))
        .catch(err => console.error('Test failed:', err));
}