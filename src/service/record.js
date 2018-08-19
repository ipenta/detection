import * as API from './API'
import { httpResultProxy } from '@/utils/proxy'
// import EntityVO from './model/EntityVO'
import axios from '@/commons/axios'

export function save(record) {
  const id = record._id
  delete record._id
  if (id === '' || id === undefined) {
    return httpResultProxy(axios.post(API.RECORD, record))
  } else {
    return httpResultProxy(axios.patch(API.RECORD + id, record))
  }
}

export function search(record) {
  return httpResultProxy(axios.get(API.RECORD, {params: record}))
}

export function findById(record) {
  return httpResultProxy(axios.get(API.RECORD + record.id))
}

export function remove(record) {
  return httpResultProxy(axios.delete(API.RECORD + record.id))
}
