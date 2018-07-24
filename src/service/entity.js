import * as API from './API'
import { httpResultProxy } from '@/utils/proxy'
// import EntityVO from './model/EntityVO'
import axios from '@/commons/axios'

export function add(entity) {
  return httpResultProxy(axios.post(API.ADD_ENTITY, entity))
}

export function search(entity) {
  return httpResultProxy(axios.post(API.GET_ENTITY_LIST, entity))
}
