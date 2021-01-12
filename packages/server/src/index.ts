import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import session from "express-session"
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { createConnection, useContainer } from 'typeorm';

// import { auth,  } from 'express-openid-connect';
import Keycloak from "keycloak-connect"
import { KeycloakContext, KeycloakTypeDefs, KeycloakSchemaDirectives } from 'keycloak-connect-graphql';

import { User } from './graphql/entities/User';
import { UserResolver } from './graphql/resolvers/UserResolver';



const main = async () => {
  dotenv.config()
  const app = express();
  const port = 4000;

  useContainer(Container);

  //
  await createConnection({
    type: 'postgres',
    url:
      process.env.DB_HOST ||
      'postgresql://postgres:postgres@localhost:5432/anysecure4',
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: ['../migrations/**/*/ts'],
    cli: {
      migrationsDir: '../migrations',
    },
  });
  app.set('trust proxy', true);

    app.use(
    cors({
      origin: ["https://studio.apollographql.com","http://localhost:3000"],
      credentials: true,
    })
  );

  const memoryStore = new session.MemoryStore();
  const keycloak = new Keycloak({store: memoryStore})

  app.use("http://localhost:4000/graphql", keycloak.middleware())

  const apolloSever = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
      dateScalarMode: 'isoDate',
      container: Container,


      // authChecker:,
    }),
    typeDefs: [KeycloakTypeDefs],
    schemaDirectives: KeycloakSchemaDirectives,
    context: ({ res, req }) => ({
      req,
      res,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      kauth: new KeycloakContext({ req : req as any })
    }),

  });

  apolloSever.applyMiddleware({ app, cors: false });

//   app.use(
//   auth({
//     authRequired:false,
//     auth0Logout:true,
//     issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
//     baseURL: process.env.AUTH0_BASE_URL,
//     clientID: process.env.AUTH0_CLIENT_ID,
//     secret: process.env.AUTH0_SECRET,
//   })
// );

// app.get("/", (req, res) => {
//   res.send(req.oidc.isAuthenticated() as any? "logged in" : "logged out")
// })


  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};


main().catch((err) => {
  console.error(err);
});
