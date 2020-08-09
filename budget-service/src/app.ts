import express from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';
import routes from './config/routes';
import cors from './config/cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
cors(app);
routes(app);

export default app;
