import { Request, Response } from "express";
import { GrantedRequest } from "keycloak-connect-graphql";
// import { createUserLoader } from "./utils/createUserLoader";
// import { createUpdootLoader } from "./utils/createUpdootLoader";

export type Context = {
  req: Request;
  res: Response;
  kauth: GrantedRequest;
  // userLoader: ReturnType<typeof createUserLoader>;
  // updootLoader: ReturnType<typeof createUpdootLoader>;
};
