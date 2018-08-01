import * as recordService from '@/service/record'
import * as types from '@/store/mutation-type'

const state = {
  records: [],
  record: {}
}

const getters = {
  records: state => state.records,
  record: state => state.record
}

const actions = {
  searchRecords: ({ commit, state }, payload) => {
    return recordService.find(payload).then(results => {
      commit(types.SET_RECORDS, results)
    })
  }
}

const mutations = {
  [types.SET_RECORDS]: (state, records) => {
    state.records = records
  },
  [types.SET_RECORD]: (state, record) => {
    state.record = record
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
