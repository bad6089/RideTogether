require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  await server.start();
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  app.get('/api/autocomplete', async (req, res) => {
    try {
      const query = req.query.q;
      const apiKey = process.env.LOCATIONIQ_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: 'Missing LocationIQ API key' });
      }

      const externalApiUrl = `https://us1.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${query}&format=json`;

      const response = await axios.get(externalApiUrl);

      if (!response.data || response.data.length === 0) {
        return res
          .status(404)
          .json({ error: 'No results found for this query.' });
      }

      const formattedAddresses = response.data.map((item) => item.display_name);

      res.json(formattedAddresses);
    } catch (err) {
      console.error('LocationIQ API Error:', err);
      if (err.response) {
        console.error('LocationIQ API Response:', err.response.data);
        res.status(err.response.status).json(err.response.data);
      } else {
        res.status(500).json({ error: 'Server error' });
      }
    }
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startServer();
