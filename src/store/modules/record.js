import * as recordService from '@/service/record'
import * as types from '@/store/mutation-type'

const state = {
  records: []
}

const getters = {
  records: state => state.records
}

const actions = {
  initRecordTable: ({ commit, state }, payload) => {
    return recordService.find(payload).then(results => {
      commit(types.FIND_RECORDS, results)
    })
  }
}

const mutations = {
  [types.FIND_RECORDS]: (state, records) => {
    state.records = records
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
