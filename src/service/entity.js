import * as API from './API'
import { httpResultProxy } from '@/utils/proxy'
// import EntityVO from './model/EntityVO'
import axios from '@/commons/axios'

export function create(entity) {
  return httpResultProxy(axios.post(API.ENTITY, entity))
}

export function search(entity) {
  return httpResultProxy(axios.get(API.ENTITY, {params: entity}))
}

export function patch(entity) {
  const id = entity.id
  delete entity.id
  return httpResultProxy(axios.patch(API.ENTITY + id, entity))
}

export function remove(entity) {
  return httpResultProxy(axios.delete(API.ENTITY + entity.id))
}
