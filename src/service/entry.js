import * as API from './API'
import { httpResultProxy } from '@/utils/proxy'
import axios from '@/commons/axios'

export function save(entry) {
  const id = entry._id
  delete entry._id
  if (id === '' || id === undefined) {
    return httpResultProxy(axios.post(API.ENTRY, entry))
  } else {
    return httpResultProxy(axios.patch(API.ENTRY + id, entry))
  }
}

export function getEntryByOrderId(entry) {
  return httpResultProxy(axios.get(API.ENTRY, {params: entry}))
}

export function search(entry) {
  return httpResultProxy(axios.get(API.ENTRY, {params: entry}))
}

export function remove(entry) {
  return httpResultProxy(axios.post(API.ENTRY, entry))
}
