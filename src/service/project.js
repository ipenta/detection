import DefaultService from './default'
import * as API from './API'
import axios from '@/commons/axios'
import { httpResultProxy } from '@/utils/proxy'

const ExtendService = {
  initFormData: function (project) {
    return httpResultProxy(axios.get(API.PROJECT + project.id))
  }
}

export default Object.assign({}, DefaultService.create({url: API.ENTITY}), ExtendService)
