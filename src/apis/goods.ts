import { result } from '@/utils/axios'

import { Good } from 'quboqin-lib-typescript/lib/goods'

export function getAllGoods(): Promise<Good[]> {
  return result('get', '/goods') as Promise<Good[]>
}
