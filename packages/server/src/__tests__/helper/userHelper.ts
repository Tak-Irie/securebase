import { User } from "../../modules/user/domain/User"
import { UserEmail } from "../../modules/user/domain/UserEmail"
import { UserName } from "../../modules/user/domain/UserName"
import { UserPassword } from "../../modules/user/domain/UserPassword"

const username = UserName.create({username:"okName"}).getValue()
const email = UserEmail.create({email:"success@email.com"}).getValue()
const password = UserPassword.create({password: "password"}).getValue()

// const validUser:User = {props:{username:{props:{username:"validName"},,

// const invalidShortUsername = UserName.create({username:"s"})
// const invalidLongUsername = UserName.create({username:"loooooooooooooooooooooooooooong"})

// const invalidEmail = UserEmail.create({email:"invalidFormat"})
// const invalidPassword = UserPassword.create({password: "short"})
export const dummyValidUser = User.create({username,email, password}).getValue()
