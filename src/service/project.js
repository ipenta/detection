import * as API from './API'
import { httpResultProxy } from '@/utils/proxy'
// import EntityVO from './model/EntityVO'
import axios from '@/commons/axios'

export function add(project) {
  return httpResultProxy(axios.post(API.ADD_PROJECT, project))
}

export function search(project) {
  return httpResultProxy(axios.get(API.SEARCH_PROJECT, {params: project}))
}
