import { result } from '@/utils/axios'

export function checkHealth<T, U>(params: T): Promise<U | void> {
  return result('get', '/health', params)
}
