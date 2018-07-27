import * as API from './API'
import { httpResultProxy } from '@/utils/proxy'
import axios from '@/commons/axios'

export function add(principal) {
  return httpResultProxy(axios.post(API.ADD_PRINCIPAL, principal))
}

export function search(principal) {
  return httpResultProxy(axios.get(API.SEARCH_PRINCIPAL, {params: principal}))
}
