import * as API from '@/service/API'
import { httpResultProxy } from '@/utils/proxy'
import axios from '@/commons/axios'

export function findOne(user) {
  return httpResultProxy(axios.post(API.FIND_USER, user))
}
