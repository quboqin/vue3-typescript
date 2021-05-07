import { provide, inject, reactive } from 'vue'

export interface UserInfo {
  userId?: string
  token?: string
  phone?: string
  email?: string
}

type UserInfoContext = {
  userInfo: UserInfo
  setUserInfo: (_userInfo: UserInfo) => void
  setUserAuthToken: (token: string) => void
}

const UserAuthSymbol = Symbol()

export const userAuthProvide: (newUser: UserInfo) => void = (newUser) => {
  const userInfo = reactive<UserInfo>(newUser)
  const setUserInfo = (newUser: UserInfo) => {
    Object.assign(userInfo, newUser)
  }
  const setUserAuthToken = (token: string) => (userInfo.token = token)

  provide(UserAuthSymbol, {
    userInfo,
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
