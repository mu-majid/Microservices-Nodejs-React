import nats from 'node-nats-streaming';

// client to connect to nats server
const client = nats.connect('gittix', 'abc', {
  url: 'http://localhost:4222'
});

client.on('connect', () => {
  console.log('PUB: connected to nats')
});