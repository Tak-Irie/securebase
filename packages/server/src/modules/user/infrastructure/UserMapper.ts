import { UniqueEntityId } from '../../../shared/UniqueEntityId';
import { User as DomainUser } from '../domain/User';
import { User as OrmUser } from '../../../graphql/entities/User';
import { UserName } from '../domain/UserName';
import { UserPassword } from '../domain/UserPassword';
import { UserEmail } from '../domain/UserEmail';

export class UserMapper {
  public static toDomain(ormUser: OrmUser): DomainUser {
    const userNameResult = UserName.create({ username: ormUser.username });
    const userPasswordResult = UserPassword.create({
      password: ormUser.password,
      isHashed: true,
    });
    const userEmailResult = UserEmail.create(ormUser.email);

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
  ): Promise<Omit<OrmUser, 'createdAt' | 'updatedAt'>> {
    let hashedPassword: string;
    if (!!user.password === true) {
      if (user.password.isAlreadyHashed()) {
        hashedPassword = user.password.props.password;
      } else {
        hashedPassword = await user.password.getHashedValue();
      }
    }
    hashedPassword = user.password.props.password;

    return {
      id: user.id.getId(),
      username: user.username.props.username,
      email: user.email.props.email,
      password: hashedPassword,
    };
  }
}
