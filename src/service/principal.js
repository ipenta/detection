import DefaultService from './default'
import * as API from './API'

const ExtendService = {

}

Object.assign({}, DefaultService.create({url: API.PRINCIPAL}), ExtendService)

export default ExtendService
