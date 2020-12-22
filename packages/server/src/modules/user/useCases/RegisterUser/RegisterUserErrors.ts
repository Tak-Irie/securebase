import { UseCaseError } from '../../../../shared/logic/UseCaseError';
import { Result } from '../../../../shared/logic/Result';

export class EmailAlreadyExistsError extends Result<UseCaseError> {
  constructor(email: string) {
    super(false, {
      message: `The email ${email} associated for this account already exists`,
    });
  }
}

export class UsernameTakenError extends Result<UseCaseError> {
  constructor(username: string) {
    super(false, {
      message: `The username ${username} was already taken`,
    });
  }
}
