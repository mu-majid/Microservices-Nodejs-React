const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());


app.post('/events', async (req, res) => {

  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    const modifiedStatus = content.includes('orange') ? 'rejected' : 'approved';
    await axios.post('http://localhost:4005/events', { type: 'CommentModerated', data: { id, content, postId, status: modifiedStatus } });

  }

  return res.send({});
});


app.listen(4003, () => {
  console.log('Moderation Service up and running on 4003');
});