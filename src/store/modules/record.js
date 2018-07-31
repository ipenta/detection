import * as recordService from '@/service/record'
import * as types from '@/store/mutation-type'

const state = {
  records: []
}

const getters = {
  records: state => state.records
}

const actions = {
  getEntities: ({ commit, state }, payload) => {
    return recordService.find(payload).then(results => {
      commit(types.SET_RECORDS, results)
    })
  }
}

const mutations = {
  [types.SET_RECORDS]: (state, records) => {
    state.records = records
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
