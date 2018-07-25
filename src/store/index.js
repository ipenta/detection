import Vue from 'vue'
import Vuex from 'vuex'
import EntityVO from '@/service/model/EntityVO'
import * as entityService from '@/service/entity'
import * as projectService from '@/service/project'

Vue.use(Vuex)

const state = {
  entity: new EntityVO()
}

const getters = {}

const actions = {
  addEntity({ commit, state }, payload) {
    return entityService.add(payload)
  },
  searchEntity({ commit, state }, payload) {
    return entityService.search(payload)
  },
  addProject({ commit, state }, payload) {
    return projectService.add(payload)
  },
  searchProject({ commit, state }, payload) {
    return projectService.search(payload)
  }
}

const mutations = {}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
