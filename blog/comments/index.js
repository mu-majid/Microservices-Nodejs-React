const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.use(bodyParser.json());
app.use(cors());
// in memory storage
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => res.send(commentsByPostId[req.params.id] || []));
app.post('/posts/:id/comments', async (req, res) => {

  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: 'pending' });
  commentsByPostId[req.params.id] = comments;

  await axios.post('http://localhost:4005/events',
    { type: 'CommentCreated', data: { id: commentId, content, postId: req.params.id, status: 'pending' } }
  );


  return res.status(201).send(comments);
});

app.post('/events', (req, res) => {
  console.log('Recieved Event ', req.body.type);

  return res.send({});
});

app.listen(4001, () => console.log('Comments up and running on 4001'));