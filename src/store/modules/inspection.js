import * as service from '@/service/inspection'
import * as types from '@/store/mutation-type'

const state = {
  inspections: []
}

const getters = {
  inspections: state => state.inspections
}

const actions = {
  search: ({ commit, state }, payload) => {
    return service.search(payload).then(results => {
      commit(types.SET_INSPECTIONS, results)
    })
  },
  submit: ({ commit, state }, payload) => {
    return service.save(payload)
  },
  remove: ({ commit, state }, payload) => {
    return service.remove(payload)
  }
}

const mutations = {
  [types.SET_INSPECTIONS]: (state, inspections) => {
    state.inspections = inspections
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
