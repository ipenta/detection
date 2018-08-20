import DefaultService from './default'
import * as API from './API'
import { httpResultProxy } from '@/utils/proxy'
import axios from '@/commons/axios'

const ExtendService = {
  getEntryByOrderId: function (entry) {
    return httpResultProxy(axios.get(API.ENTRY, {params: entry}))
  }
}

export default Object.assign({}, DefaultService.create({url: API.ENTRY}), ExtendService)
