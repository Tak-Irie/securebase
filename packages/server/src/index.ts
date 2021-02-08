import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
// import helmet from "helmet"
// import session from "express-session"
import cors from 'cors';
import { join } from 'path';

import { ApolloServer } from 'apollo-server-express';
// import Keycloak from "keycloak-connect"
import { KeycloakContext, KeycloakTypeDefs, KeycloakSchemaDirectives} from 'keycloak-connect-graphql';

import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typedi';
import { buildSchema } from 'type-graphql';

import resolvers from "./graphql/resolvers/index"
import createKeyCloak from './keycloak/createKeyCloak';
// import { authChecker } from './graphql/utils/AuthChecker';


const main = async () => {
  dotenv.config()
  const app = express();
  const port = 4000;
  const graphqlPath = "/graphql"

  // app.use(helmet())

  useContainer(Container);
  await createConnection({
    type: 'postgres',
    url:
    // process.env.DB_HOST ||
    'postgresql://postgres:postgres@localhost:5432/anysecure4',
    synchronize: true,
    logging: true,
    entities: [join(__dirname, './graphql/entities/*.ts')],
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

    // const memoryStore = new session.MemoryStore();
    // const keycloak = new Keycloak({store: memoryStore})

    // app.use("/graphql", keycloak.middleware())

  // const {keycloak} =
  createKeyCloak(app, graphqlPath)



  const apolloSever = new ApolloServer({
    typeDefs: [KeycloakTypeDefs],
    schemaDirectives: KeycloakSchemaDirectives,
    schema: await buildSchema({
      resolvers,
      validate: false,
      dateScalarMode: 'isoDate',
      container: Container,
      // authChecker
    }),
    // schemaDirectives: {
    //   hasRole: HasRoleDirective,
    //   auth: AuthDirective
    // },
    context: ({ res, req }) => ({
      req,
      res,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      kauth: new KeycloakContext({ req : req as any })
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
