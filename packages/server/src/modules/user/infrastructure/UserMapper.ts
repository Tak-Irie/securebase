import { User } from '../../../graphql/entities/User';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { User as DomainUser } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserName } from '../domain/UserName';
import { UserPassword } from '../domain/UserPassword';

export class UserMapper {
  // public static toGraphQL(ormUser: User): User {
  //   return ormUser;
  // }

  public static toDomain(ormUser: User): DomainUser {
    const userNameResult = UserName.create({ username: ormUser.username });
    const userPasswordResult = UserPassword.create({
      password: ormUser.password,
      isHashed: true,
    });
    const userEmailResult = UserEmail.create({email:ormUser.email});

    const userResult = new DomainUser({
      id: new UniqueEntityId(ormUser.id),
      username: userNameResult.getValue(),
      password: userPasswordResult.getValue(),
      email: userEmailResult.getValue(),
    });

    return userResult;
  }

  public static async toTypeOrm(
    user: DomainUser,
  ): Promise<Omit<User, 'createdAt' | 'updatedAt'>> {
    let hashedPassword = '';
    if (!!user.password === true) {
      if (user.password.isAlreadyHashed()) {
        hashedPassword = user.password.props.password;
      } else {
        hashedPassword = await user.password.getHashedValue();
      }
    }

    return {
      id: user.id.getId(),
      username: user.username.props.username,
      email: user.email.props.email,
      password: hashedPassword,
    };
  }
}
