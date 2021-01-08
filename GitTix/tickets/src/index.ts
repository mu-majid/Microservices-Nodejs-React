import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';

const start  = async () => {

  console.log('Tickets Service starting After some checks...')


  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY env should be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI env should be defined');
  }

  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL env should be defined');
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID env should be defined');
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID env should be defined');
  }

  try {
    await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);
    natsWrapper.client.on('close', () => {
      console.log('NATS Connection Closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    console.log('Connected to MongoDB');

  } 
  catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('Tickets Server on port 3000!!!');
  });
}

start();