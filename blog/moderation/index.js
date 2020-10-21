const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


app.post('/events', (req, res) => {

  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;
    posts[postId].comments.push({ id, content, postId });
  }

  return res.send({});
});


app.listen(4003, () => {
  console.log('Moderation Service up and running on 4003');
});