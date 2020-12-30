
import { dummyValidUser } from "../helper/userHelper";
import { User } from "../../modules/user/domain/User";
import { UserEmail } from "../../modules/user/domain/UserEmail";
import { IUserRepository } from "../../modules/user/domain/IUserRepository";
import { RegisterUserUseCase } from "../../modules/user/useCases/registerUser/RegisterUserUseCase";
import { GetUserByIdUseCase } from "../../modules/user/useCases/getUserById/GetUserByIdUseCase";
import { GetUsersUseCase } from "../../modules/user/useCases/getUsers/GetUsersUseCase";

jest.useFakeTimers()
const MockRepo = jest.fn<IUserRepository,[]>().mockImplementation(() => ({
    confirmExistence: async (userEmail: UserEmail): Promise<boolean> => {
      if (userEmail.props.email === "dupulicate@test.com") return true
      await Promise.resolve("nothing")

      return false},
    getUserByUserId: async (userId: string): Promise<User | undefined> => {
      if(userId === "1") return dummyValidUser
      await Promise.resolve("nothing")

      return undefined

    },
    registerUser: async (user: User): Promise<User | void> => {
      if(typeof user === "object" ) return user
      await Promise.resolve("nothing")

      return undefined
    },
    getUsers: async (): Promise<User[] | undefined> =>{
      await Promise.resolve("nothing")

      return [dummyValidUser,dummyValidUser]
    }
  })
)
const repo = new MockRepo()

describe("ユーザー登録テスト", () => {
  const registerUserUseCase = new RegisterUserUseCase(repo);

  test("登録成功", async (done) => {

    const validMock = {username: "validName", email: "valid@test.com", password: "validPassword"}
    const result = await registerUserUseCase.execute(validMock)

    expect(result.isRight()).toBeTruthy()
    done()
  })
  test("短すぎる名前により登録失敗", async (done) => {
    const invalidNameMock = {username: "f", email: "valid@test.com", password: "validPassword"}
    const result = await registerUserUseCase.execute(invalidNameMock)

    expect(result.isLeft()).toBeTruthy()
    expect(result.value.getErrorValue()).toBe("ユーザー名は最小2文字です")
    done()
  })
    test("長過ぎる名前により登録失敗", async (done) => {
    const invalidNameMock = {username: "YourNameIsSoLongPleaseChangeThis",
                            email: "valid@test.com",
                            password: "validPassword"}
    const result = await registerUserUseCase.execute(invalidNameMock)

    expect(result.isLeft()).toBeTruthy()
    expect(result.value.getErrorValue()).toBe("ユーザー名は最大15文字です")
    done()
  })
    test("不正なメールアドレスにより登録失敗", async (done) => {
    const invalidNameMock = {username: "validName", email: "invalid", password: "validPassword"}
    const result = await registerUserUseCase.execute(invalidNameMock)

    expect(result.isLeft()).toBeTruthy()
    expect(result.value.getErrorValue()).toBe("メールアドレスに使用できない文字が含まれています")
    done()
  })
    test("不正なパスワードにより登録失敗", async (done) => {
    const invalidNameMock = {username: "validName", email: "valid@test.com", password: "invalid"}
    const result = await registerUserUseCase.execute(invalidNameMock)

    expect(result.isLeft()).toBeTruthy()
    expect(result.value.getErrorValue()).toBe("パスワードは8文字以上に設定してください")
    done()
  })
    test("メールアドレスの重複により登録失敗", async (done) => {
    const invalidNameMock = {username: "validName", email: "dupulicate@test.com", password: "validPassword"}
    const result = await registerUserUseCase.execute(invalidNameMock)

    expect(result.isLeft()).toBeTruthy()
    expect(result.value.getErrorValue()).toBe("こちらのEmail\"dupulicate@test.com\"は既に登録されています")
    done()
  })
})

describe("ユーザー検索テスト", () => {
  test("検索成功", async (done) => {
    const getUserByIdUseCase = new  GetUserByIdUseCase(repo)
    const result = await getUserByIdUseCase.execute("1")

    expect(result.isRight()).toBeTruthy()
    expect(result.value.getValue()).toBe(dummyValidUser)
    done()
  })

    test("検索失敗", async (done) => {
    const getUserByIdUseCase = new  GetUserByIdUseCase(repo)
    const result = await getUserByIdUseCase.execute("999")

    expect(result.isLeft()).toBeTruthy()
    expect(result.value.getErrorValue()).toBe("こちらのユーザーID\"999\"を持つユーザーは見つかりませんでした")
    done()
  })
})

describe("ユーザーズ取得テスト", () => {
  test("検索成功", async (done) => {
    const getUsersUseCase = new  GetUsersUseCase(repo)
    const result = await getUsersUseCase.execute()

    expect(result.isRight()).toBeTruthy()
    expect(result.value.getValue()).toStrictEqual({"users":[dummyValidUser,dummyValidUser]})
    done()
  })
})