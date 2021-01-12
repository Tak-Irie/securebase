import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { TypeOrmUserRepository } from '../../modules/user/infrastructure/TypeOrmUserRepository';
import { GetUserByIdUseCase } from '../../modules/user/useCases/getUserById/GetUserByIdUseCase';
import { RegisterUserUseCase } from '../../modules/user/useCases/registerUser/RegisterUserUseCase';
import { GetUsersUseCase } from '../../modules/user/useCases/getUsers/GetUsersUseCase';
import { User } from '../entities/User';
import { UserInput, UserResponse, Users } from '../types';

@Resolver(User)
export class UserResolver {
  constructor(
    @InjectRepository()
    private readonly OrmUserRepository: TypeOrmUserRepository,
  ) {}

  @Query(() => UserResponse, { nullable: true })
  async userGetById(@Arg('id') id: string): Promise<UserResponse | null> {
    const getUserByIdUseCase = new GetUserByIdUseCase(this.OrmUserRepository);
    const result = await getUserByIdUseCase.execute(id);
    if (result.isLeft())
      return { message: result.value.getErrorValue(), user: null };

    return { message: 'success', user: result.value.getValue() };
  }

  @Query(() => Users, { nullable: true })
  async users(): Promise<Users | null> {
    const getUsersUseCase = new GetUsersUseCase(this.OrmUserRepository);
    const result = await getUsersUseCase.execute();
    if (result.isLeft())
      return { message: result.value.getErrorValue(), users: null };

    return { message: 'success', users: result.value.getValue().users };
  }

  @Mutation(() => UserResponse)
  async userRegister(
    @Arg('options') options: UserInput,
    // @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const registerUserUseCase = new RegisterUserUseCase(this.OrmUserRepository);
    const result = await registerUserUseCase.execute(options);
    if (result.isLeft()) {
      const response = { message: result.value.getErrorValue(), user: null };

      return response;
    }

    // req.session.userId = user.id;

    // must refactor
    return { message: 'registered!', user: null };
  }
  // @FieldResolver(() => String)
  // email(@Root() user: User, @Ctx() { req }: MyContext) {
  //   // this is the current user and its ok to show them their own email
  //   if (req.session.userId === user.id) {
  //     return user.email;
  //   }
  //   // current user wants to see someone elses email
  //   return "";
  // }

  // @Mutation(() => UserResponse)
  // async changePassword(
  //   @Arg("token") token: string,
  //   @Arg("newPassword") newPassword: string,
  //   @Ctx() { redis, req }: MyContext
  // ): Promise<UserResponse> {
  // }

  // @Mutation(() => Boolean)
  // async forgotPassword(
  //   @Arg("email") email: string,
  //   @Ctx() { redis }: MyContext
  // ) {
  // }

  // @Query(() => User, { nullable: true })
  // me(@Ctx() { req }: MyContext) {
  //   // you are not logged in
  //   if (!req.session.userId) {
  //     return null;
  //   }

  //   return User.findOne(req.session.userId);
  // }

  // store user id session
  // this will set a cookie on the user
  // keep them logged in

  // @Mutation(() => UserResponse)
  // async login(
  //   @Arg("usernameOrEmail") usernameOrEmail: string,
  //   @Arg("password") password: string,
  //   @Ctx() { req }: MyContext
  // ): Promise<UserResponse> {}

  // @Mutation(() => Boolean)
  // logout(@Ctx() { req, res }: MyContext) {
  // }
}
