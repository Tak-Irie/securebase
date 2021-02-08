import { Application } from 'express'
import session from 'express-session'
import Keycloak from 'keycloak-connect'

// import keycloakConfig from "./keycloakConfig.json"

const configureKeycloak = (app: Application, graphqlPath: string) => {

  // const _keycloakConfig = JSON.parse(keycloakConfig)

  const memoryStore = new session.MemoryStore()

  const keycloakConfig = {
  "realm": "securebase",
  "bearer-only": true,
  "auth-server-url": "http://localhost:8080/auth",
  "ssl-required": "external",
  "resource": "service-nodejs",
  "confidential-port": "http://localhost:4000"
}


  app.use(session({
    secret: process.env.SESSION_SECRET_STRING || 'this should be a long secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  }))

  const keycloak = new Keycloak({
    store: memoryStore
  }, keycloakConfig)

  // Install general keycloak middleware
  app.use(keycloak.middleware({
    admin: graphqlPath
  }))

  // Protect the main route for all graphql services
  // Disable unauthenticated access
  app.use(graphqlPath, keycloak.middleware())

  return { keycloak }
}

export default configureKeycloak
