import { provide, inject, reactive } from 'vue'
import { CognitoUser } from 'amazon-cognito-identity-js'

export interface UserInfo {
  userId?: string
  cognitoUser?: CognitoUser
  token?: string
  phone?: string
  email?: string
}

type UserInfoContext = {
  userInfo: UserInfo
  setCognitoUser: (cognitoUser: CognitoUser) => void
  setUserInfo: (newUser: UserInfo) => void
  setUserAuthToken: (token: string) => void
  setUserPhone: (phone: string) => void
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

  const setUserPhone = (phone: string) => (userInfo.phone = phone)

  provide(UserAuthSymbol, {
    userInfo,
    setCognitoUser,
    setUserInfo,
    setUserAuthToken,
    setUserPhone,
  })
}

export const userAuthInject: () => UserInfoContext = () => {
  const userAuthContext = inject<UserInfoContext>(UserAuthSymbol)

  if (!userAuthContext) {
    throw new Error(`userAuthInject must be used after userAuthProvide`)
  }

  return userAuthContext
}
