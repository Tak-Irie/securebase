import { UseCaseError } from '../UseCaseError';
import { Result } from './Result';

export class UnexpectedError extends Result<UseCaseError> {
  public constructor(err: unknown) {
    super(false, {
      message: `An unexpected error occurred.`,
      error: err,
    } as UseCaseError);
  }

  public static create(err: unknown): UnexpectedError {
    return new UnexpectedError(err);
  }
}
