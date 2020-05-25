import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from '../controller/resolvers';
import { login } from '../controller/controllers';

const executableSchema = makeExecutableSchema({
  typeDefs: fs.readFileSync(
    path.resolve(__dirname, './schema.graphql'),
    'utf8'
  ),
  resolvers,
});

const routes = (app: express.Application) => {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('default error, ', err);
    return res.status(500).json({ message: 'server error' });
  });
  app.get('/auth', login);
  app.use(
    '/graphql',
    graphqlHTTP({
      schema: executableSchema,
      graphiql: true,
    })
  );
};

export default routes;
