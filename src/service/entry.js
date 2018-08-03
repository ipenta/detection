import * as API from './API'
import { httpResultProxy } from '@/utils/proxy'
import axios from '@/commons/axios'

export function add(entry) {
  return httpResultProxy(axios.post(API.ADD_ENTRY, entry))
}

export function addBatch(entries) {
  return httpResultProxy(axios.post(API.ADD_ENTRIES, entries))
}

export function getEntryByOrderId(entry) {
  return httpResultProxy(axios.get(API.GET_ENTRY_BY_ORDERID, {params: entry}))
}

export function search(query) {
  return httpResultProxy(axios.get(API.GET_ENTRIES, {params: query}))
}
