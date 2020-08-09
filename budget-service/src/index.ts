import app from './app';
import db from './config/db';

db().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`
    ---------------
    Server Started
  
    Port: ${process.env.PORT}
    `);
  });
});
