import { result, AxioFunc } from '@/utils/axios'

export const getAllTasks: AxioFunc = (params: Record<string, unknown> = {}) => {
  return result('get', '/tasks', params)
}
