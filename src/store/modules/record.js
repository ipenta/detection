import * as service from '@/service/record'
import * as types from '@/store/mutation-type'
import RecordVO from '@/service/model/RecordVO'

const state = {
  list: [],
  record: new RecordVO()
}

const getters = {
  list: state => state.list,
  record: state => state.record
}

const actions = {
  search: ({ commit, state }, payload) => {
    return service.search(payload).then(results => {
      commit(types.SET_RECORDS, results)
    })
  },
  detail: ({ commit, state }, payload) => {
    return service.findById({id: payload.id}).then(result => {
      commit(types.SET_RECORD, result)
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
  [types.SET_RECORDS]: (state, list) => {
    state.list = list
  },
  [types.SET_RECORD]: (state, record) => {
    state.record = record
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
