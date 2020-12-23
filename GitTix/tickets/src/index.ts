import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const start  = async () => {

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY env should be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI env should be defined');
  }

  try {
    await natsWrapper.connect('gittix', 'random', 'http://nats-srv:4222');
    natsWrapper.client.on('close', () => {
      console.log('NATS Connection Closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

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