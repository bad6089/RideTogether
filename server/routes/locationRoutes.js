// server/routes/locationRoutes.js
require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const locationIQKey = process.env.LOCATIONIQ_API_KEY;

router.get('/autocomplete', async (req, res) => {
  try {
    const searchTerm = req.query.q; // Get the search query from the frontend

    const response = await axios.get(
      'https://api.locationiq.com/v1/autocomplete.php',
      {
        params: {
          key: locationIQKey,
          q: searchTerm, // Pass the search term to the API
          limit: 10, // Limit results (optional)
        },
      }
    );

    const suggestions = response.data.map((place) => ({
      name: place.display_name,
      placeId: place.place_id,
      coordinates: [parseFloat(place.lon), parseFloat(place.lat)], // Directly include coordinates array
    }));


    res.json(suggestions);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ error: 'Error fetching suggestions' });
  }
});

module.exports = router;
