import { AggregateRoot } from '../../../shared/AggregateRoot';
import { UniqueEntityId } from '../../../shared/UniqueEntityId';
import { Result } from '../../../shared/logic/Result';
import { UserEmail } from './UserEmail';
import { UserPassword } from './UserPassword';
import { UserName } from './UserName';
// eslint-disable-next-line import/no-cycle
import { UserCreated } from './events/UserCreated';

interface UserProps {
  username: UserName;
  email: UserEmail;
  password: UserPassword;
  // // isEmailVerified: boolean;
  // profilePicture?: string;
  // firstName?: string;
  // lastName?: string;
}

export class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create(props: UserProps): Result<User> {
    const user = new User({
      ...props,
    });
    user.addDomainEvent(new UserCreated(user));

    return Result.success<User>(user);
  }
}
