import mongoose from 'mongoose';
import { app } from './app';

const start  = async () => {

  console.log('Auth service starting ...')
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY env should be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI env should be defined');
  }

  try {
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
    console.log('Auth Server on port 3000!!!');
  });
}

start();