import * as service from '@/service/entity'
import * as types from '@/store/mutation-type'

import {EntityMap} from '@/utils/map'

const state = {
  list: []
}

const getters = {
  list: state => state.list
}

const actions = {
  search: ({ commit, state }, payload) => {
    return service.search(payload).then(results => {
      results.map(item => { item.type = EntityMap[item.type] })
      commit(types.SET_ENTITIES, results)
    })
  },
  submit: ({ commit, state }, payload) => {
    return (payload.id !== '') ? service.patch(payload) : service.create(payload)
  },
  remove: ({ commit, state }, payload) => {
    return service.remove(payload)
  }
}

const mutations = {
  [types.SET_ENTITIES]: (state, list) => {
    state.list = list
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
