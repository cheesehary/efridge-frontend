import express from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import routes from './config/routes';
import cors from './config/cors';

dotenv.config();

createConnection()
  .then(() => console.log(`db connected`))
  .catch((err) => console.log(err));

const app = express();

cors(app);
routes(app);

export default app;
