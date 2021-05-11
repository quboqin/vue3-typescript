import { result, AxioFunc } from '@/utils/axios'

export const saveCard: AxioFunc = (params: Record<string, unknown> = {}) => {
  return result('post', '/cards', params)
}
