import { result } from '@/utils/axios'

export function getAllGoods<T, U>(params: T): Promise<U | void> {
  return result('get', '/goods', params)
}
