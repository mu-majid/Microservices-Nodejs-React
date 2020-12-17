import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const uniqueClientId = randomBytes(4).toString('hex');

const client = nats.connect('gittix', uniqueClientId, {
  url: 'http://localhost:4222'
});

client.on('connect', () => {
  console.log('Listener connected To NATS');

  const subOpts = client.subscriptionOptions()
    .setManualAckMode(true)


  const subscription = client.subscribe('ticket:created', 'listenerQueueGroup', subOpts);

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Recieved Event #${msg.getSequence}, with data ${data}`);
    }

    msg.ack();
  });
});