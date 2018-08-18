import * as API from './API'
import { httpResultProxy } from '@/utils/proxy'
import axios from '@/commons/axios'

export function save(inspection) {
  const id = inspection._id
  delete inspection._id
  if (id !== '') {
    return httpResultProxy(axios.patch(API.INSPECTION + id, inspection))
  } else {
    return httpResultProxy(axios.post(API.INSPECTION, inspection))
  }
}

export function search(inspection) {
  return httpResultProxy(axios.get(API.INSPECTION, {params: inspection}))
}

export function remove(inspection) {
  return httpResultProxy(axios.delete(API.INSPECTION + inspection.id))
}

export function initFormData(inspection) {
  return httpResultProxy(axios.get(API.INSPECTION + inspection.id))
}
