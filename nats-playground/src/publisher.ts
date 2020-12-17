import nats from 'node-nats-streaming';


console.clear();

// client to connect to nats server
const client = nats.connect('gittix', 'abc', {
  url: 'http://localhost:4222'
});

client.on('connect', () => {
  console.log('PUB: connected to nats');

  const data = {
    id: '123asd',
    title: 'Hello',
    price: 12
  };

  client.publish('ticket:created', JSON.stringify(data), () => {
    console.log('event published..')
  })
});