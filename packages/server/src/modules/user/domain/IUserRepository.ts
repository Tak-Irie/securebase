import { User } from './User';
import { UserEmail } from './UserEmail';

export interface IUserRepository {
  confirmExistence(userEmail: UserEmail): Promise<boolean>;
  getUserByUserId(userId: string): Promise<unknown | undefined>;
  registerUser(user: User): Promise<User | void>;
  getUsers(): Promise<unknown[] | undefined>;
}
