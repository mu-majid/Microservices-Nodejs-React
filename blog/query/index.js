const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.post('/events', (req, res) => {

  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;
    posts[postId].comments.push({ id, content, postId });
  }

  return res.send({});
});

app.get('/posts', (req, res) => {

});

app.listen(4002, () => {
  console.log('Query Service up and running on 4002');
});