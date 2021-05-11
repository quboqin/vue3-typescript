import { result, AxioFunc } from '@/utils/axios'

export const getUserById: AxioFunc = (params: Record<string, unknown> = {}) => {
  return result('get', '/users', params)
}
