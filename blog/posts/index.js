const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// in memory storage
const posts = {};

app.get('/posts', (req, res) => res.send(posts));

app.post('/posts/create', async (req, res) => {

  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = { id, title };

  await axios.post('http://eventbus-srvc:4005/events', { type: 'PostCreated', data: { id, title } });

  return res.status(201).send({ id, title });
});

app.post('/events', (req, res) => {
  console.log('Recieved Event ', req.body.type);

  return res.send({});
});

app.listen(4000, () => console.log('Posts up and running on 4000'));