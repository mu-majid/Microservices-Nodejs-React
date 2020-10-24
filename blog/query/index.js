const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, postId, status });
  }

  if (type === 'CommentUpdated') {
    const { id, postId, content, status } = data;
    const comment = posts[postId].comments.find(comment => comment.id === id);
    comment.status = status;
    comment.content = content;
  }
}

app.post('/events', (req, res) => {

  const { type, data } = req.body;
  console.log ('Event : ', type);

  handleEvent(type, data);

  return res.send({});
});

app.get('/posts', (req, res) => {
  return res.send(posts)
});

app.listen(4002, async () => {
  console.log('Query Service up and running on 4002');

  const { data } = await axios.get('http://eventbus-srvc:4005/events');

  for (const event of data) {
    handleEvent(event.type, event.data);
  }
});