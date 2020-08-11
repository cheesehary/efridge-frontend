import request from 'supertest';
import app from '../app';
import * as TestFactory from './TestFactory';
import { User } from '../entity/User';

jest.mock('../middleware/auth');
const auth = require('../middleware/auth').default;

describe('/graphql user operations', () => {
  let me: User;
  beforeAll(async () => {
    await TestFactory.dbConnection();
    me = await TestFactory.createUserAndProfile();
    auth.mockImplementation(async (req: any, res: any, next: any) => {
      req.userId = me.id;
      next();
    });
  });
  afterAll(async () => await TestFactory.dropDatabase());
  test('get user and profile', async () => {
    const res = await request(app)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send(
        JSON.stringify({
          query: `
            query FetchUser {
              user {
                id
                firstName
              }
              profile {
                income
                savingsGoal
              }
              balance
            }
          `,
        })
      );
    expect(res.status).toBe(200);
    expect(res.body.data.user.firstName).toBe('first');
    expect(res.body.data.profile.income).toBe(4000);
    expect(res.body.data.profile.savingsGoal).toBe(1000);
    expect(res.body.data.balance).toBe(0);
  });
});
