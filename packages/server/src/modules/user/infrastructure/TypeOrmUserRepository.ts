import { EntityRepository, EntityManager } from 'typeorm';
import { UserRepository } from '../domain/UserRepository';
import { User as OrmUser } from '../../../graphql/entities/User';
import { UserEmail } from '../domain/UserEmail';
import { User as DomainUser } from '../domain/User';
import { UserMapper } from './UserMapper';

@EntityRepository()
export class TypeOrmUserRepository implements UserRepository {
  constructor(private manager: EntityManager) {}

  async confirmExistence(userEmail: UserEmail): Promise<boolean> {
    const { email } = userEmail.props;
    const result = await this.manager.findOne(OrmUser, { email });

    return !!result;
  }

  async getUserByUserId(userId: string): Promise<DomainUser> {
    const result = await this.manager.findOneOrFail(OrmUser, { id: userId });

    return UserMapper.toDomain(result);
  }

  async registerUser(user: DomainUser): Promise<void> {
    const confirmExistence = await this.confirmExistence(user.email);
    if (!confirmExistence) {
      const data = await UserMapper.toTypeOrm(user);
      await this.manager.save(OrmUser, {
        ...data,
      });
    }
  }
}
