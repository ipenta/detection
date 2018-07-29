import * as entityService from '@/service/entity'
import * as projectService from '@/service/project'
import * as inspectionService from '@/service/inspection'
import * as entryService from '@/service/entry'
import * as principalService from '@/service/principal'
import * as recordService from '@/service/record'

const actions = {
  addEntity({
    commit,
    state
  }, payload) {
    return entityService.add(payload)
  },
  searchEntity({
    commit,
    state
  }, payload) {
    return entityService.search(payload)
  },
  addProject({
    commit,
    state
  }, payload) {
    return projectService.add(payload)
  },
  searchProject({
    commit,
    state
  }, payload) {
    return projectService.search(payload)
  },
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
  addEntry({
    commit,
    state
  }, payload) {
    return entryService.add(payload)
  },
  getEntryByOrderId({
    commit,
    state
  }, payload) {
    return entryService.getEntryByOrderId(payload)
  },
  addPrincipal({
    commit,
    state
  }, payload) {
    return principalService.add(payload)
  },
  searchPrincipal({
    commit,
    state
  }, payload) {
    return principalService.search(payload)
  },
  addRecord({
    commit,
    state
  }, payload) {
    return recordService.add(payload)
  }
}

export default actions