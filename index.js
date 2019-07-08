const express = require('express');

const db = require('./data/db');

const server = express();
server.use(express.json());

const PORT = process.env.PORT || 5000;

// routes
server.get('/', (req, res) => {
  res.status(200).send('Server Up')
})

server.listen(PORT, () => {
  console.log(`Server is live @ 127.0.0.1:${PORT}`);
});
