import DefaultService from './default'
import * as API from './API'

const ExtendService = {

}

Object.assign({}, DefaultService.create({url: API.ENTITY}), ExtendService)

export default ExtendService
