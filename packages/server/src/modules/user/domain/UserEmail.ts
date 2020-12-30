import { Result } from '../../../shared/Result';
import { ValueObject } from '../../../shared/domain/ValueObject';

export type UserEmailProps = {
  email: string;
};

export class UserEmail extends ValueObject<UserEmailProps> {
  private constructor(props: UserEmailProps) {
    super(props);
  }

  private static isValidEmail(email: string) {
    const emailRegExp = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

    return emailRegExp.test(email);
  }

  private static formatEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  public static create(email: UserEmailProps): Result<UserEmail> {
    if (!this.isValidEmail(email.email)) {
      return Result.fail<UserEmail>('メールアドレスに使用できない文字が含まれています');
    }

    return Result.success<UserEmail>(
      new UserEmail({ email: this.formatEmail(email.email) }),
    );
  }
}
