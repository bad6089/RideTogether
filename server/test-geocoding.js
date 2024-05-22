require('dotenv').config();
const axios = require('axios');

async function geocodeAddress(address) {
  try {
    const response = await axios.get(
      `https://eu1.locationiq.com/v1/search.php?key=${
        process.env.LOCATIONIQ_API_KEY
      }&q=${encodeURIComponent(address)}&format=json`
    );

    const result = response.data;

    if (result.length > 0) {
      const { lat, lon } = result[0];
      console.log(`Geocoded ${address} to: ${lat}, ${lon}`);
    } else {
      console.log(`Address not found: ${address}`);
    }
  } catch (error) {
    console.error(`Error geocoding ${address}:`, error.message);
  }
}

// Array of addresses to test
const addressesToTest = [
  'Senai, Johor, Malaysia',
  'Cheras, Kuala Lumpur, Malaysia',
];

// Rate limiting: 1 request per second (adjust if needed)
const rateLimitDelay = 1000; // 1000 ms = 1 second

async function runTests() {
  for (const address of addressesToTest) {
    await geocodeAddress(address);
    await new Promise((resolve) => setTimeout(resolve, rateLimitDelay));
  }
}

runTests();
module.exports = { geocodeAddress };
