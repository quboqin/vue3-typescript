import { provide, inject, reactive } from 'vue'
import { CognitoUser } from 'amazon-cognito-identity-js'

import { User } from 'quboqin-lib-typescript/lib/user'

export class UserInfo {
  user?: User
  cognitoUser?: CognitoUser
  token?: string
}

type UserInfoContext = {
  userInfo: UserInfo
  setCognitoUser: (cognitoUser: CognitoUser) => void
  setUserInfo: (newUser: UserInfo) => void
  setUserAuthToken: (token: string) => void
}

const UserAuthSymbol = Symbol()

export const userAuthProvide: (newUser: UserInfo) => void = (newUser) => {
  const userInfo = reactive<UserInfo>(newUser)

  const setCognitoUser = (cognitoUser: CognitoUser) =>
    (userInfo.cognitoUser = cognitoUser)

  const setUserInfo = (newUser: UserInfo) => {
    Object.assign(userInfo, newUser)
  }

  const setUserAuthToken = (token: string) => (userInfo.token = token)

  provide(UserAuthSymbol, {
    userInfo,
    setCognitoUser,
    setUserInfo,
    setUserAuthToken,
  })
}

export const userAuthInject: () => UserInfoContext = () => {
  const userAuthContext = inject<UserInfoContext>(UserAuthSymbol)

  if (!userAuthContext) {
    throw new Error(`userAuthInject must be used after userAuthProvide`)
  }

  return userAuthContext
}
