import { ValueObject } from '../../../shared/ValueObject';
import { Result } from '../../../shared/logic/Result';
import { Guard } from '../../../shared/logic/Guard';
import { Validation } from '../../../shared/logic/Validation';

type UserNameProps = {
  username: string;
};

export class UserName extends ValueObject<UserNameProps> {
  public static MAX_LENGTH = 15;
  public static MIN_LENGTH = 2;

  private constructor(props: UserNameProps) {
    super(props);
  }

  public static create(props: UserNameProps): Result<UserName> {
    const usernameResult = Guard.falsyCheck({
      argument: props.username,
      argumentName: 'username',
    });
    if (!usernameResult.succeeded) {
      return Result.fail<UserName>(usernameResult.message);
    }

    const minLengthResult = Validation.smallerThan(
      this.MIN_LENGTH,
      props.username,
    );
    if (!minLengthResult) {
      return Result.fail<UserName>('ユーザー名は最大15文字です。');
    }

    const maxLengthResult = Validation.greaterThan(
      this.MAX_LENGTH,
      props.username,
    );
    if (!maxLengthResult) {
      return Result.fail<UserName>('ユーザー名は最小2文字です。');
    }

    return Result.success<UserName>(new UserName(props));
  }
}
