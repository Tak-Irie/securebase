import { Result } from '../../../../shared/logic/Result';
import { Either } from '../../../../shared/logic/Either';
import * as RegisterUserErrors from './RegisterUserErrors';
import { UnexpectedError } from '../../../../shared/logic/UnexpectedError';

export type RegisterUserResponse = Either<
  | RegisterUserErrors.EmailAlreadyExistsError
  | UnexpectedError
  | Result<unknown>,
  Result<void>
>;
