import Vue from 'vue'
import Vuex from 'vuex'
import EntityVO from '@/service/model/EntityVO'
import * as entityService from '@/service/entity'
import * as projectService from '@/service/project'
import * as inspectionService from '@/service/inspection'
import * as entryService from '@/service/entry'
import * as principalService from '@/service/principal'
import * as recordService from '@/service/record'

Vue.use(Vuex)

const state = {
  entity: new EntityVO(),
  message: {
    showClose: true,
    message: '',
    type: 'success',
    duration: 2000
  }
}

const getters = {
  message: state => state.message
}

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

const mutations = {
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
