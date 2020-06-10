import express from 'express';
import fs from 'fs';
import path from 'path';
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from '../controller/resolvers';
import { login, errorHandler } from '../controller/controllers';
import auth from '../middleware/auth';

const executableSchema = makeExecutableSchema({
  typeDefs: fs.readFileSync(
    path.resolve(__dirname, '../../schema.graphql'),
    'utf8'
  ),
  resolvers,
});

const routes = (app: express.Application) => {
  app.use(errorHandler);
  app.get('/auth', login);
  app.use(
    '/graphql',
    auth,
    graphqlHTTP({
      schema: executableSchema,
      graphiql: true,
    })
  );
};

export default routes;
