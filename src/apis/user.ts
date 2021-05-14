import { result, AxioFunc } from '@/utils/axios'

export const getUserByPhone: AxioFunc = (
  params: Record<string, unknown> = {},
) => {
  return result('get', '/users', params)
}

export const createUser: AxioFunc = (params: Record<string, unknown> = {}) => {
  return result('post', '/users', params)
}
