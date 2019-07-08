const express = require('express');

const db = require('./data/db');

const server = express();
server.use(express.json());

const PORT = process.env.PORT || 5000;

// routes
const routes = {
  base: '/',
  api: '/api/users',
};

server.post(routes.api, async (req, res) => {
  try {
    const name = req.body.name.trim();
    const bio = req.body.bio.trim();

    if (name && bio) {
      const userDetails = { name, bio };
      const newUser = await db.insert(userDetails);
      res.status(201).json({ ...newUser, ...userDetails });
    } else {
      res
        .status(400)
        .json({ errorMessage: 'Please provide name and bio for the user.' });
    }
  } catch {
    res.status(500).json({
      errorMessage: 'There was an error while saving the user to the database',
    });
  }
});

server.get(routes.api, async (req, res) => {
  try {
    const allUsers = await db.find();
    res.status(200).json(allUsers);
  } catch {
    res
      .status(500)
      .json({ error: 'The users information could not be retrieved.' });
  }
});

server.get(`${routes.api}/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await db.findById(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist.' });
    }
  } catch {
    res
      .status(500)
      .json({ error: 'The user information could not be retrieved.' });
  }
});

server.delete(`${routes.api}/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await db.remove(id);

    if (user) {
      res.status(204).json();
    } else {
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist.' });
    }
  } catch {
    res.status(500).json({ error: 'The user could not be removed' });
  }
});


server.delete(routes.api, (req, res) => {});

server.listen(PORT, () => {
  console.log(`Server is live @ 127.0.0.1:${PORT}`);
});
