import * as inspectionService from '@/service/inspection'
import * as recordService from '@/service/record'

const actions = {
  addInspection({
    commit,
    state
  }, payload) {
    return inspectionService.add(payload)
  },
  searchInspection({
    commit,
    state
  }, payload) {
    return inspectionService.search(payload)
  },
  addRecord({
    commit,
    state
  }, payload) {
    return recordService.add(payload)
  }
}

export default actions
