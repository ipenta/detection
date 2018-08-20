import DefaultService from './default'
import * as API from './API'

const ExtendService = {

}

Object.assign(ExtendService, DefaultService.create({url: API.PRINCIPAL}))

export default ExtendService
