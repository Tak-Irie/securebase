import { AuthChecker } from "type-graphql";
import { Context } from "./Context";

// create auth checker function
export const authChecker: AuthChecker<Context> = (kauth) => {
  if (!kauth) {
    // if `@Authorized()`, check only if user exists
    return false;
  }
  // there are some roles defined now
  if (kauth) {
    // grant access if the roles overlap
    return true;
  }

  return false
  // no roles matched, restrict access
};