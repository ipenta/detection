import * as inspectionService from '@/service/inspection'
import * as types from '@/store/mutation-type'

const state = {
  inspections: []
}

const getters = {
  inspections: state => state.inspections
}

const actions = {
  searchInspections: ({ commit, state }, payload) => {
    return inspectionService.search(payload).then(results => {
      commit(types.SET_INSPECTIONS, results)
    })
  }
}

const mutations = {
  [types.SET_INSPECTIONS]: (state, inspections) => {
    state.inspections = inspections
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
