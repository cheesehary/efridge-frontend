import express from 'express';

const cors = (app: express.Application) => {
  app.use((req, res, next) => {
    res.set({
      'Access-Control-Allow-Origin': process.env.APP_URL,
      'Access-Control-Allow-Credentials': true,
    });
    next();
  });
};

export default cors;
