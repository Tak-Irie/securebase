import { User } from './User';
import { UserEmail } from './UserEmail';

export interface UserRepository {
  confirmExistence(userEmail: UserEmail): Promise<boolean>;
  getUserByUserId(userId: string): Promise<User>;
  registerUser(user: User): Promise<void>;
}
