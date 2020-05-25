import { saveUser } from '../service/UserService';

export default {
  Query: {
    user(obj, args, context) {},
  },
  Mutation: {
    upsertUser(obj, { user }, context) {
      return saveUser(user);
    },
  },
};
