import * as API from './API'
import { httpResultProxy } from '@/utils/proxy'
import EntityVO from './model/EntityVO'
import axios from '@/commons/axios'

export function addEntity() {
  let promise = axios.post(API.ADD_ENTITY, this.entity)
  return httpResultProxy(promise, EntityVO)
}
