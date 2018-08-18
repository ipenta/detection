import * as API from './API'
import { httpResultProxy } from '@/utils/proxy'
import axios from '@/commons/axios'

export function save(principal) {
  const id = principal._id
  delete principal._id
  if (id !== '') {
    return httpResultProxy(axios.patch(API.PRINCIPAL + id, principal))
  } else {
    return httpResultProxy(axios.post(API.PRINCIPAL, principal))
  }
}

export function search(principal) {
  return httpResultProxy(axios.get(API.PRINCIPAL, {params: principal}))
}

export function remove(principal) {
  return httpResultProxy(axios.delete(API.PRINCIPAL + principal.id))
}
