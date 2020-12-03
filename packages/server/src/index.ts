import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';

const main = async () => {
  const app = express();
  const port = 3000;

  //
  await createConnection();

  app.get('/', (_req, res) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

main().catch((err) => {
  console.error(err);
});
