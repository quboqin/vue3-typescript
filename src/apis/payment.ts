import { result, AxioFunc } from '@/utils/axios'

export const payOrder: AxioFunc = (params: Record<string, unknown> = {}) => {
  return result('post', '/orders', params)
}
