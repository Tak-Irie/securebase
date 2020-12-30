import { ValueObject } from '../../../shared/domain/ValueObject';
import { Result } from '../../../shared/Result';
import { Guard } from '../../../shared/Guard';
import { Validation } from '../../../shared/domain/Validation';

type UserNameProps = {
  username: string;
};

export class UserName extends ValueObject<UserNameProps> {
  public static MIN_LENGTH = 2;
  public static MAX_LENGTH = 15;

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
    const greaterEnough = Validation.valueGreaterThanLimit(
      this.MIN_LENGTH,
      props.username,
    );
    if (!greaterEnough) {
      return Result.fail<UserName>('ユーザー名は最小2文字です');
    }

    const lessEnough = Validation.valueLessThanLimit(
      this.MAX_LENGTH,
      props.username,
    );
    if (!lessEnough) {
      return Result.fail<UserName>('ユーザー名は最大15文字です');
    }


    return Result.success<UserName>(new UserName(props));
  }
}
