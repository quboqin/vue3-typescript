import { result } from '@/utils/axios'

export function getUserByPhone<T, U>(params: T): Promise<U | void> {
  return result('get', '/users', params)
}

export function getAllAddresses<T, U>(params: T): Promise<U | void> {
  return result('get', '/addresses', params)
}

export function createUser<T, U>(params: T): Promise<U | void> {
  return result('post', '/users', params)
}

export function createAddress<T, U>(params: T): Promise<U | void> {
  return result('post', '/addresses', params)
}

export function deleteAddress<T, U>(params: T): Promise<U | void> {
  return result('del', '/addresses', params)
}
