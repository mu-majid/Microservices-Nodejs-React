import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import mongoose from 'mongoose';

it('Should return 404 if ticket not found', async () => {
  await request(app)
    .get(`/api/tickets/${mongoose.Types.ObjectId()}`)
    .set('Cookie', global.signin())
    .send()
    .expect(404)
});

it('Should return the ticket if found', async () => {

  const title = 'concert';
  const price = 214;

  // another approach is to insert to DB directly from test case
  const { body } = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title, price
    })
    .expect(201);

  const res = await request(app)
    .get(`/api/tickets/${body.id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(200);

  expect(res.body.title).toEqual(title);
  expect(res.body.price).toEqual(price);
});