import { httpResultProxy } from '@/utils/proxy'
import axios from '@/commons/axios'

const DefaultService = {
  create: function (path) {
    const _defaultService = {}

    _defaultService.save = function (entity) {
      const id = entity._id
      delete entity._id
      if (id === '' || id === undefined) {
        return httpResultProxy(axios.post(path.url, entity))
      } else {
        return httpResultProxy(axios.patch(path.url + id, entity))
      }
    }

    _defaultService.search = function (entity) {
      return httpResultProxy(axios.get(path.url, {params: entity}))
    }

    _defaultService.remove = function (entity) {
      return httpResultProxy(axios.delete(path.url + entity.id))
    }

    return _defaultService
  }
}

export default DefaultService
