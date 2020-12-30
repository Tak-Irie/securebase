import { Either, left, right } from '../../../../shared/Either';
import { Result } from '../../../../shared/Result';
import { UnexpectedError } from '../../../../shared/UnexpectedError';
import { IUseCase } from '../../../../shared/useCase/IUseCase';
import { User } from '../../domain/User';
import { UserEmail } from '../../domain/UserEmail';
import { UserName } from '../../domain/UserName';
import { UserPassword } from '../../domain/UserPassword';
import { IUserRepository } from '../../domain/IUserRepository';
import { IUseCaseError } from '../../../../shared/useCase/IUseCaseError';

type RegisterUserDTO = {
  username: string;
  email: string;
  password: string;
};
type UserTypes = UserEmail | UserName | UserPassword;

class EmailAlreadyExistsError extends Result<IUseCaseError> {
  constructor(email: string, error?: Error) {
    super(false, `こちらのEmail"${email}"は既に登録されています`, error);
  }
}


type RegisterUserResponse = Either<
  EmailAlreadyExistsError | UnexpectedError | Result<UserTypes>| Result<User>,
  Result<void>
>;

export class RegisterUserUseCase
  implements IUseCase<RegisterUserDTO, Promise<RegisterUserResponse>> {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(
    request: RegisterUserDTO,
  ): Promise<RegisterUserResponse> {
    const usernameOrError = UserName.create({
      username: request.username,
    });
    const emailOrError: Result<UserEmail> = UserEmail.create({email: request.email});

    const passwordOrError = UserPassword.create({
      password: request.password,
    });


    const verifiedResult = Result.verifyResults<UserTypes>([
      emailOrError,
      passwordOrError,
      usernameOrError,
    ]);

    if (verifiedResult.isFailure) {
      return left(Result.fail<UserTypes>(verifiedResult.getErrorValue()));
    }

    const email: UserEmail = emailOrError.getValue();
    const password: UserPassword = passwordOrError.getValue();
    const username: UserName = usernameOrError.getValue();

    try {
      const userEmailAlreadyRegistered = await this.userRepository.confirmExistence(
        email,
      );

      if (userEmailAlreadyRegistered) {
        return left(new EmailAlreadyExistsError(email.props.email));
      }
      const userOrError = User.create({
        email,
        password,
        username,
      });

      if (userOrError.isFailure)
        return left(Result.fail<User>(userOrError.getErrorValue()));

      await this.userRepository.registerUser(userOrError.getValue());

      return right(Result.success<void>());
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
