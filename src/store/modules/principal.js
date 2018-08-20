import service from '@/service/principal'
import * as types from '@/store/mutation-type'

const state = {
  list: []
}

const getters = {
  list: state => state.list
}

const actions = {
  search: ({ commit, state }, payload) => {
    return service.search(payload).then(results => {
      commit(types.SET_PRINCIPALS, results)
    })
  },
  submit: ({ commit, state }, payload) => {
    console.log(payload)
    return service.save(payload)
  },
  remove: ({ commit, state }, payload) => {
    return service.remove(payload)
  }
}

const mutations = {
  [types.SET_PRINCIPALS]: (state, list) => {
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
