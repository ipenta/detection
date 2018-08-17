import * as API from './API'
import { httpResultProxy } from '@/utils/proxy'
// import EntityVO from './model/EntityVO'
import axios from '@/commons/axios'

export function create(project) {
  return httpResultProxy(axios.post(API.PROJECT, project))
}

export function search(project) {
  return httpResultProxy(axios.get(API.PROJECT, {params: project}))
}

export function remove(project) {
  return httpResultProxy(axios.delete(API.PROJECT + project.id))
}

export function initFormData(project) {
  return httpResultProxy(axios.get(API.PROJECT + project.id))
}
