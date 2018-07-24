import * as API from './API'
import { httpResultProxy } from '@/utils/proxy'
// import EntityVO from './model/EntityVO'
import axios from '@/commons/axios'

export function addEntity(entity) {
  return httpResultProxy(axios.post(API.ADD_ENTITY, entity))
}
