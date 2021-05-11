import { result, AxioFunc } from '@/utils/axios'

export const checkHealth: AxioFunc = (params: Record<string, unknown> = {}) => {
  return result('get', '/health', params)
}
