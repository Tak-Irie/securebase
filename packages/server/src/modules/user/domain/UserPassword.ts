import argon2 from 'argon2';

import { Guard } from '../../../shared/logic/Guard';
import { Result } from '../../../shared/logic/Result';
import { ValueObject } from '../../../shared/ValueObject';

type UserPasswordProps = {
  password: string;
  isHashed?: boolean;
};

export class UserPassword extends ValueObject<UserPasswordProps> {
  private constructor(props: UserPasswordProps) {
    super(props);
  }

  public static create(props: UserPasswordProps): Result<UserPassword> {
    const propsResult = Guard.falsyCheck({
      argument: props.password,
      argumentName: 'password',
    });

    if (!propsResult.succeeded) {
      return Result.fail<UserPassword>(propsResult.message);
    }
    if (!props.isHashed) {
      if (!this.isAppropriateLength(props.password)) {
        return Result.fail<UserPassword>(
          'パスワードは8文字以上に設定してください。',
        );
      }
    }

    return Result.success<UserPassword>(
      new UserPassword({
        password: props.password,
        isHashed: !!props.isHashed === true,
      }),
    );
  }

  public static isAppropriateLength(password: string): boolean {
    return password.length >= 8;
  }

  public async getHashedValue(): Promise<string> {
    if (this.isAlreadyHashed()) return this.props.password;

    return this.hashPassword(this.props.password);
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let isHashed: string;
    if (this.isAlreadyHashed()) {
      isHashed = this.props.password;

      return this.verifyPassword(plainTextPassword, isHashed);
    }

    return this.props.password === plainTextPassword;
  }

  private async verifyPassword(
    plainText: string,
    hashed: string,
  ): Promise<boolean> {
    const result = await argon2.verify(hashed, plainText);

    return result;
  }

  /**
   * @method check this.props.isHashed
   * @returns boolean
   */
  public isAlreadyHashed(): boolean {
    if (!this.props.isHashed) return false;

    return this.props.isHashed;
  }

  private async hashPassword(password: string): Promise<string> {
    const hashedPassword = await argon2.hash(password);

    return hashedPassword;
  }
}
