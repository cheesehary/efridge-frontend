import express from 'express';
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { schema } from './schema';
import { resolvers } from './resolvers';

const executableSchema = makeExecutableSchema({ typeDefs: schema, resolvers });

const routes = (app: express.Application) => {
  app.use(
    '/graphql',
    graphqlHTTP({
      schema: executableSchema,
      graphiql: true,
    })
  );
};

export default routes;
