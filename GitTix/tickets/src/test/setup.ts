import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { app } from '../app';

// no particular reason for being global
// just to avoid writing multiple imports in test files
// could be a function in a util file
declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[]; // arr related to supertest handling cookies in arr
    }
  }
}

jest.mock('../nats-wrapper');


let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdasdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  mongo = new MongoMemoryServer();
  const mongoURI = await mongo.getUri();

  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  // build a jwt payload { id, email }
  const payload = { id: new mongoose.Types.ObjectId().toHexString(), email: 'test@test.com' }

  // create jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object { jwt: 'asf' }
  const session = { jwt: token };

  // Convert session to json thwn to base64
  const cookie = Buffer.from(JSON.stringify(session)).toString('base64');

  return [`express:sess=${cookie}`];
};
