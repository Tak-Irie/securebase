import { left, right } from '../../../../shared/logic/Either';
import { Result } from '../../../../shared/logic/Result';
import { UnexpectedError } from '../../../../shared/logic/UnexpectedError';
import { UseCase } from '../../../../shared/UseCase';
import { User } from '../../domain/User';
import { UserEmail } from '../../domain/UserEmail';
import { UserName } from '../../domain/UserName';
import { UserPassword } from '../../domain/UserPassword';
import { UserRepository } from '../../domain/UserRepository';
import { RegisterUserDTO } from './RegisterUserDTO';
import * as RegisterUserErrors from './RegisterUserErrors';
import { RegisterUserResponse } from './RegisterUserResponse';

type UserTypes = UserName | UserEmail | UserPassword;

export class RegisterUserUseCase
  implements UseCase<RegisterUserDTO, Promise<RegisterUserResponse>> {
  constructor(private userRepository: UserRepository) {}
  public async identify(
    request: RegisterUserDTO,
  ): Promise<RegisterUserResponse> {
    const emailOrError: Result<UserEmail> = UserEmail.create(request.email);

    const passwordOrError: Result<UserPassword> = UserPassword.create({
      password: request.password,
    });

    const usernameOrError: Result<UserName> = UserName.create({
      username: request.username,
    });

    // needs refactor
    const verifiedResult = Result.verifyResults<UserTypes>([
      emailOrError,
      passwordOrError,
      usernameOrError,
    ]);

    if (verifiedResult.isFailure) {
      return left(Result.fail<UserTypes>(verifiedResult.error as string));
    }

    const email: UserEmail = emailOrError.getValue();
    const password: UserPassword = passwordOrError.getValue();
    const username: UserName = usernameOrError.getValue();

    try {
      const userEmailAlreadyRegistered = await this.userRepository.identify(
        email,
      );

      if (userEmailAlreadyRegistered) {
        return left(
          new RegisterUserErrors.EmailAlreadyExistsError(email.props.email),
        );
      }
      const userOrError: Result<User> = User.create({
        email,
        password,
        username,
      });

      if (userOrError.isFailure) {
        return left(Result.fail<User>(userOrError.error.toString()));
      }

      const user: User = userOrError.getValue();

      await this.userRepository.save(user);

      return right(Result.success<void>());
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
