import { provide, inject, reactive } from 'vue'
import { CognitoUser } from 'amazon-cognito-identity-js'

import { User } from 'quboqin-lib-typescript/lib/user'
import { Item } from 'quboqin-lib-typescript/lib/item'

export interface UserInfo {
  user: User
  cognitoUser?: CognitoUser
  cart?: {
    items?: Item[]
    totalPrice: number
    tax: number
    tips: number
    deliverFee: number
    deliverDate: string
  }
}

type UserInfoContext = {
  userInfo: UserInfo
  setCognitoUser: (cognitoUser: CognitoUser) => void
  setUserInfo: (newUser: UserInfo) => void
  addCart: (newItem: Item) => void
  removeItem: (index: number) => void
}

const UserAuthSymbol = Symbol()

export const userAuthProvide: (newUser: UserInfo) => void = newUser => {
  function updateTotalPrice() {
    let price = 0.0
    userInfo.cart?.items?.forEach(item => {
      price += item.amount * item.price
    })
    if (userInfo.cart) {
      userInfo.cart.totalPrice = price
    }
  }

  const userInfo = reactive<UserInfo>(newUser)

  const setCognitoUser = (cognitoUser: CognitoUser) =>
    (userInfo.cognitoUser = cognitoUser)

  const setUserInfo = (newUser: UserInfo) => {
    Object.assign(userInfo, newUser)
  }

  const addCart = (newItem: Item) => {
    userInfo.cart?.items?.push(newItem)
    updateTotalPrice()
  }

  const removeItem = (index: number) => {
    userInfo.cart?.items?.splice(index, 1)
    updateTotalPrice()
  }

  provide(UserAuthSymbol, {
    userInfo,
    setCognitoUser,
    setUserInfo,
    addCart,
    removeItem,
  })
}

export const userAuthInject: () => UserInfoContext = () => {
  const userAuthContext = inject<UserInfoContext>(UserAuthSymbol)

  if (!userAuthContext) {
    throw new Error(`userAuthInject must be used after userAuthProvide`)
  }

  return userAuthContext
}
