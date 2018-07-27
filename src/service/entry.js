import * as API from './API'
import { httpResultProxy } from '@/utils/proxy'
import axios from '@/commons/axios'

export function add(entry) {
  return httpResultProxy(axios.post(API.ADD_ENTRY, entry))
}
