import { provide, inject, reactive } from 'vue'
import { CognitoUser } from 'amazon-cognito-identity-js'

import { User } from 'quboqin-lib-typescript/lib/user'

export interface UserInfo {
  user: User
  cognitoUser?: CognitoUser
}

type UserInfoContext = {
  userInfo: UserInfo
  setCognitoUser: (cognitoUser: CognitoUser) => void
  setUserInfo: (newUser: UserInfo) => void
}

const UserAuthSymbol = Symbol()

export const userAuthProvide: (newUser: UserInfo) => void = (newUser) => {
  const userInfo = reactive<UserInfo>(newUser)

  const setCognitoUser = (cognitoUser: CognitoUser) =>
    (userInfo.cognitoUser = cognitoUser)

  const setUserInfo = (newUser: UserInfo) => {
    Object.assign(userInfo, newUser)
  }

  provide(UserAuthSymbol, {
    userInfo,
    setCognitoUser,
    setUserInfo,
  })
}

export const userAuthInject: () => UserInfoContext = () => {
  const userAuthContext = inject<UserInfoContext>(UserAuthSymbol)

  if (!userAuthContext) {
    throw new Error(`userAuthInject must be used after userAuthProvide`)
  }

  return userAuthContext
}
