import { saveUser } from '../service/UserService';

export const resolvers = {
  Query: {
    user(obj, args, context) {},
  },
  Mutation: {
    upsertUser(obj, { user }, context) {
      return saveUser(user);
    },
  },
};
