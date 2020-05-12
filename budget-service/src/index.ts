import app from './app';

app.listen(process.env.PORT, () => {
  console.log(`
  ---------------
  Server Started

  Port: ${process.env.PORT}
  `);
});
