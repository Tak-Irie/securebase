import { Arg,
  // Ctx,
   Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
// import { MyContext } from '../../types';
import { Test } from '../entities/Test';


@ObjectType()
export class TestResponse {
  @Field(() => String, {nullable: true})
  hello: string | null

  @Field(() => Test, { nullable: true })
  test: Test | null;
}

@InputType()
export class TestInput {
  @Field()
  adminField: string;

  @Field()
  developerField: string;

  @Field()
  adminAndDeveloperField: string;
}


@Resolver(Test)
export class TestResolver {
  // @Authorized()
  @Query(() => TestResponse, {nullable: true})
  authHello(
  // @Ctx(){ kauth }: MyContext
  ): TestResponse | null {
    const hello = null
    console.log(':', )

    return hello
  }

  // @Authorized("DEVELOPER")
  @Mutation(() => TestResponse)
  async createTest(
    @Arg('options') options: TestInput,
  ):Promise<TestResponse>{
    const test = await Test.create({...options}).save()

    return {hello: null, test}
  }
}