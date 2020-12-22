import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();

const uniqueClientId = randomBytes(4).toString('hex');

const client = nats.connect('gittix', uniqueClientId, {
  url: 'http://localhost:4222'
});

client.on('connect', () => {
  console.log('Listener connected To NATS');

  client.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  new TicketCreatedListener(client).listen();

});

process.on('SIGINT', () => client.close());
process.on('SIGTERM', () => client.close());
