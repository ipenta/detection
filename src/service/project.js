import * as API from './API'
import { httpResultProxy } from '@/utils/proxy'
// import EntityVO from './model/EntityVO'
import axios from '@/commons/axios'

export function create(project) {
  delete project._id
  return httpResultProxy(axios.post(API.PROJECT, project))
}

export function patch(project) {
  const id = project._id
  delete project._id
  return httpResultProxy(axios.patch(API.PROJECT + id, project))
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
