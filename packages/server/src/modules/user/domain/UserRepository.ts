import { User } from './User';
import { UserEmail } from './UserEmail';
import { UserName } from './UserName';

export interface UserRepository {
  identify(userEmail: UserEmail): Promise<boolean>;
  getUserByUserId(userId: string): Promise<User>;
  getUserByUserName(userName: UserName | string): Promise<User>;
  save(user: User): Promise<void>;
}
