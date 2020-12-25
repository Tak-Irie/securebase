import { UseCaseError } from '../../../../shared/logic/UseCaseError';
import { Result } from '../../../../shared/logic/Result';

export class EmailAlreadyExistsError extends Result<UseCaseError> {
  constructor(email: string) {
    super(false, {
      message: `こちらのEmail"${email}"は既に登録されています`,
    });
  }
}
