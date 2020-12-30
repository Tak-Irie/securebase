import { UserPassword } from "../../modules/user/domain/UserPassword"
import { UserEmail } from "../../modules/user/domain/UserEmail"
import { UserName } from "../../modules/user/domain/UserName"
import { User } from "../../modules/user/domain/User"

const username = UserName.create({username:"okName"}).getValue()
const email = UserEmail.create({email:"success@email.com"}).getValue()
const password = UserPassword.create({password: "password"}).getValue()

const invalidShortUsername = UserName.create({username:"s"})
const invalidLongUsername = UserName.create({username:"loooooooooooooooooooooooooooong"})

const invalidEmail = UserEmail.create({email:"invalidFormat"})
const invalidPassword = UserPassword.create({password: "short"})
describe("ドメインユーザー",() =>{
test("ユーサー作成成功", () => {
  const result = User.create({username,email, password}).getValue()

  expect(result.id.getId()).toBeTruthy()
  expect(result.username.props.username).toBe("okName")
  expect(result.email.props.email).toBe("success@email.com")
  // isHashedを確認
  expect(result.password.props.password).toBe("password")
  expect(result.password.props.isHashed).toBeFalsy()
})

test("不正なユーザーネーム", () => {
  expect(invalidShortUsername.getErrorValue()).toBe("ユーザー名は最小2文字です")
  expect(invalidLongUsername.getErrorValue()).toBe("ユーザー名は最大15文字です")
})

test("不正なメールアドレス", () => {
  expect(invalidEmail.getErrorValue()).toBe("メールアドレスに使用できない文字が含まれています")
})

test("不正なパスワード", () => {
  expect(invalidPassword.getErrorValue()).toBe("パスワードは8文字以上に設定してください")
})
})