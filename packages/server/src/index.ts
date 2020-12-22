/* eslint-disable */
import 'reflect-metadata';
import 'dotenv';
import express from 'express';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import UserResolver from './graphql/resolvers/user';
import { User } from './graphql/entities/User';

const main = async () => {
  const app = express();
  const port = 4000;

  //
  const conn = await createConnection({
    type: 'postgres',
    url:
      process.env.DB_HOST ||
      'postgresql://postgres:postgres@localhost:5432/anysecure4',
    synchronize: true,
    logging: true,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    entities: [User],
    migrations: ['../migrations/**/*/ts'],
    cli: {
      migrationsDir: '../migrations',
    },
  });
  await conn.synchronize();

  const apolloSever = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
      dateScalarMode: 'isoDate',
      // authChecker:,
    }),
    context: ({ res, req }) => ({
      req,
      res,
    }),
  });

  apolloSever.applyMiddleware({ app, cors: false });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

main().catch((err) => {
  console.error(err);
});
