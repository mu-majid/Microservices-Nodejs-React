import mongoose from 'mongoose';
import { app } from './app';

const start  = async () => {

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY env should be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/tickets-auth', {
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
    console.log('Auth Server on port 3000!!!');
  });
}

start();