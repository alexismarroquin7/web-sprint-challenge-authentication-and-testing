const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');

const johnDoe = { username: 'johnDoe', password: '1234' };
const janeDoe = { username: 'janeDoe', password: '1234' };

// Write your tests here
test('sanity', () => {
  expect(true).not.toBe(false)
})

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db('users').truncate();
});
afterAll(async () => {
  await db.destroy();
});

describe('server', () => {
  describe('[POST] /api/auth/register', () => {
    it('on FAILED registration due to `username` or `password` missing responds with { "message": "username and password required" }', async () => {
      const res = await request(server).post('/api/auth/register').send({});
      expect(res.body).toMatchObject({ message: 'username and password required' });
    }, 500);
    it('on FAILED registration due to `username` being taken responds with { "message": "username taken" }', async () => {
      await db('users').insert(johnDoe);
      const res = await request(server).post('/api/auth/register').send(johnDoe);
      expect(res.body).toMatchObject({ message: 'username taken' });
    }, 500);
    it('on SUCCESSFUL registration the response body should have `id`, `username`, `password` { "id": 1, "username": "johnDoe", "password": "hashed pass" }', async () => {
      const res = await request(server).post('/api/auth/register').send(johnDoe);
      expect(res.body).toMatchObject({ id: 1, username: johnDoe, password: "hashed pass" });
    }, 500);
  });
  // describe('[POST] /api/auth/login', () => {

  // });
  // describe('[GET] /api/jokes', () => {

  // });
});