import * as API from './API'
import { httpResultProxy } from '@/utils/proxy'
// import EntityVO from './model/EntityVO'
import axios from '@/commons/axios'

export function add(record) {
  return httpResultProxy(axios.post(API.ADD_RECORD, record))
}

export function find(query) {
  return httpResultProxy(axios.get(API.ADD_RECORD, query))
}
