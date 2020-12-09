/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { EntityRepository, AbstractRepository } from 'typeorm';
import argon2 from 'argon2';
import { ulid } from 'ulid';
import { UserInput } from '../types';
import { User } from '../entities/User';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  async createAndSave(options: UserInput): Promise<User> {
    const user: User = new User();
    const hashedPassword = await argon2.hash(options.password);
    user.id = ulid();
    user.username = options.username;
    user.email = options.email;
    user.password = hashedPassword;

    return this.manager.save(user);
  }

  async findByName(username: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ username });

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ email });

    return user;
  }
}
