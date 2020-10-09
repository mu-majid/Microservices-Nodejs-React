const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

// in memory storage
const posts = {};

app.get('/posts', (req, res) => res.send(posts));
app.post('/posts', (req, res) => {

  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = { id, title };

  return res.status(201).send({ id, title });
});

app.listen(4000, () => console.log('App up and running on 4000'));