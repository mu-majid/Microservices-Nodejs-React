import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('has a route handler listening to /api/tickets for post requests', async () => {
  const { status } = await request(app).post('/api/tickets').send({});

  expect(status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  const { status } = await request(app).post('/api/tickets').send({});

  expect(status).toEqual(401);
});

it('returns a status other than 401 if user is signed in', async () => {
  const { status } = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({});

  expect(status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'asldkjf',
      price: -10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'laskdfj',
    })
    .expect(400);
});

it('creates a ticket with valid inputs', async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title: 'laskdfj',
    price: 10
  })
  .expect(201);

  tickets = await Ticket.find({});

  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(10);
});