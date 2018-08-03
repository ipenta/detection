import * as recordService from '@/service/record'
import * as types from '@/store/mutation-type'
import RecordVO from '@/service/model/RecordVO'

const state = {
  records: [],
  record: new RecordVO()
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
  },
  getRecordDetail: ({ commit, state }, payload) => {
    return recordService.findOne(payload).then(result => {
      commit(types.SET_RECORD, result)
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
