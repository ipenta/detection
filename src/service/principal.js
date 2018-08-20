import DefaultService from './default'
import * as API from './API'

const ExtendService = {

}

export default Object.assign({}, DefaultService.create({url: API.PRINCIPAL}), ExtendService)
