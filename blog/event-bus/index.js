const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  // assuming these services never go down (not handling service failure)
  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:4001/events', event);
  axios.post('http://localhost:4002/events', event);
  axios.post('http://localhost:4003/events', event);


  return res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  return res.send(events);
})

app.listen(4005, () => console.log('Event-Bus up and running on 4005'))