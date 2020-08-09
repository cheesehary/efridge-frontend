import { getManager, getConnection, createConnection } from 'typeorm';
import { User } from '../entity/User';
import { Profile } from '../entity/Profile';

export const createUserAndProfile = async () => {
  return await getManager().transaction(async (manager) => {
    const userObj = manager.create(User, {
      firstName: 'first',
      lastName: 'last',
      googleId: 'googleId',
    });
    const user = await manager.save(userObj);
    // @ts-ignore
    const profileObj = manager.create(Profile, {
      userId: user.id,
      income: 4000,
      savingsGoal: 1000,
    });
    await manager.save(profileObj);
    return user;
  });
};

export const dbConnection = () =>
  //@ts-ignore
  createConnection({
    type: 'sqlite',
    database: 'budget_testing',
    entities: ['src/entity/*.ts'],
    migrations: ['src/migration/*.ts'],
    synchronize: true,
  });

export const dropDatabase = async () => {
  const entities = getConnection().entityMetadatas;
  const conn = getConnection();
  for (const entity of entities) {
    const repository = conn.getRepository(entity.name);
    await repository.clear();
  }
};
