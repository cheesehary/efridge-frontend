import express from 'express';

const cors = (app: express.Application) => {
  app.use((req, res, next) => {
    res.set({
      'Access-Control-Allow-Origin': process.env.APP_URL,
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': 86400,
    });
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });
};

export default cors;
