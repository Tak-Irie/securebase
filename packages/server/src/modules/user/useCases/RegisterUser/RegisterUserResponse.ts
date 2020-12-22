import { Result } from '../../../../shared/logic/Result';
import { Either } from '../../../../shared/logic/Either';
import * as RegisterUserErrors from './RegisterUserErrors';
import { UnexpectedError } from '../../../../shared/logic/UnexpectedError';

/**
 * left is errors, right is success
 */
export type RegisterUserResponse = Either<
  | RegisterUserErrors.EmailAlreadyExistsError
  | RegisterUserErrors.UsernameTakenError
  | UnexpectedError
  | Result<unknown>,
  Result<void>
>;
