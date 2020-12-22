import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

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


abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, msg: Message): void;

  private client: Stan;
  protected ackWait =  5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  public subscriptionOptions () {

    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName)
  }

  public listen () {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on('message', (msg: Message) => {
      console.log(
        `Message received: ${this.subject} / ${this.queueGroupName}`
      );

      const parsedMsg = this.parseMessage(msg);
      this.onMessage(parsedMsg, msg);
    });
  }

  public parseMessage (msg: Message) {
    const data = msg.getData();

    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'))
  }
}

class TicketCreatedListener extends Listener {
  subject: string = 'ticket:created';
  queueGroupName: string = 'payment-service';
  onMessage(data: any, msg: nats.Message): void {
    console.log('Event data ', data)
    msg.ack();
  }
  
}