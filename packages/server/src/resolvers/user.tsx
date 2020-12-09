/* eslint-disable */
import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repository/UserRepository';
import { UserInput } from '../types';
import { User } from '../entities/User';

// @ObjectType()
// class FieldError {
//   @Field()
//   field: string;

//   @Field()
//   message: string;
// }

// @ObjectType()
// class UserResponse {
//   @Field(() => [FieldError], { nullable: true })
//   errors?: FieldError[];

//   @Field(() => User, { nullable: true })
//   user?: User;
// }

@InputType()
export class UsernamePasswordInput implements UserInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}

@Resolver(User)
export default class UserResolver {
  @Query(() => String)
  async hello() {
    return 'hello world';
  }
  @Query(() => User, { nullable: true })
  userFindByName(@Arg('username') username: string): Promise<User | undefined> {
    const userRepository = getCustomRepository(UserRepository);
    return userRepository.findByName(username);
  }

  @Query(() => User, { nullable: true })
  userFindByEmail(@Arg('email') email: string): Promise<User | undefined> {
    const userRepository = getCustomRepository(UserRepository);
    return userRepository.findByEmail(email);
  }

  @Mutation(() => User)
  userCreate(@Arg('options') options: UsernamePasswordInput): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    return userRepository.createAndSave(options);
  }
}
