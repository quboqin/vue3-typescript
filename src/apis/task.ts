import { result, AxioFunc } from '@/utils/axios'

export const saveTask: AxioFunc = (params: Record<string, unknown> = {}) => {
  return result('post', '/tasks', params)
}

export const getAllTasks: AxioFunc = (params: Record<string, unknown> = {}) => {
  return result('get', '/tasks', params)
}

export const removeTask: AxioFunc = (params: Record<string, unknown> = {}) => {
  return result('del', '/tasks', params)
}
