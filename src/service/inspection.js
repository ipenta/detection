import * as API from './API'
import { httpResultProxy } from '@/utils/proxy'
import InspectionVO from './model/InspectionVO'
import axios from '@/commons/axios'

export function add(inspection) {
  return httpResultProxy(axios.post(API.ADD_INSPECTION, inspection), InspectionVO)
}

export function search(inspection) {
  return httpResultProxy(axios.get(API.SEARCH_INSPECTION, {params: inspection}))
}
