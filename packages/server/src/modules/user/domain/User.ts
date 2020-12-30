import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { Result } from '../../../shared/Result';
// eslint-disable-next-line import/no-cycle
// import { UserCreated } from './events/UserCreated';
import { UserEmail } from './UserEmail';
import { UserName } from './UserName';
import { UserPassword } from './UserPassword';

interface UserProps {
  id?: UniqueEntityId;
  username: UserName;
  email: UserEmail;
  password: UserPassword;
  // // isEmailVerified: boolean;
  // profilePicture?: string;
  // firstName?: string;
  // lastName?: string;
}

export class User extends AggregateRoot<UserProps> {
  constructor(readonly props: UserProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get username(): UserName {
    return this.props.username;
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  public static create(props: UserProps): Result<User> {

    const user = new User({
      ...props,
    });
    // user.addDomainEvent(new UserCreated(user));

    return Result.success<User>(user);
  }
}
