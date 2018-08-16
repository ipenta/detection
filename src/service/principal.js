import * as API from './API'
import { httpResultProxy } from '@/utils/proxy'
import axios from '@/commons/axios'

export function create(principal) {
  return httpResultProxy(axios.post(API.PRINCIPAL, principal))
}

export function patch(principal) {
  const id = principal.id
  delete principal.id
  return httpResultProxy(axios.patch(API.PRINCIPAL + id, principal))
}

export function search(principal) {
  console.log(principal)
  return httpResultProxy(axios.get(API.PRINCIPAL, {params: principal}))
}

export function remove(principal) {
  return httpResultProxy(axios.delete(API.PRINCIPAL + principal.id))
}
