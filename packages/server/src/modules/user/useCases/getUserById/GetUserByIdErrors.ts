import { Result } from '../../../../shared/Result';
import { IUseCaseError } from '../../../../shared/useCase/IUseCaseError';

export class UserNotFoundError extends Result<IUseCaseError> {
  constructor(userId: string) {
    super(
      false,
      `こちらのユーザーID"${userId}"を持つユーザーは見つかりませんでした`,
    );
  }
}
