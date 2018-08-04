import * as API from './API'
import { httpResultProxy } from '@/utils/proxy'
import axios from '@/commons/axios'

export function save(entry) {
  return httpResultProxy(axios.post(API.SAVE_ENTRY, entry))
}

export function getEntryByOrderId(entry) {
  return httpResultProxy(axios.get(API.GET_ENTRY_BY_ORDERID, {params: entry}))
}

export function search(query) {
  return httpResultProxy(axios.get(API.GET_ENTRIES, {params: query}))
}

export function remove(query) {
  return httpResultProxy(axios.post(API.REMOVE_ENTRY, query))
}
