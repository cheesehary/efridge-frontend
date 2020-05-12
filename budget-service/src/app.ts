import express from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';
import mountRoutes from './config/routes';

dotenv.config();

const app = express();

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': process.env.APP_URL,
    'Access-Control-Allow-Credentials': true,
  });
  next();
});

mountRoutes(app);

export default app;
