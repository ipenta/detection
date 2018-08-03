import * as entryService from '@/service/entry'
import * as types from '@/store/mutation-type'

const state = {
  entries: []
}

const getters = {
  entries: state => state.entries
}

const actions = {
  submitEntries: ({ commit, state }, payload) => {
    return entryService.addBatch(payload.filter(item => delete item._id)).then(results => {
      commit(types.SET_ENTRIES, results)
    })
  },
  createEntry: ({ commit, state }, payload) => {
    commit(types.SET_ENTRIES, payload)
  }
}

const mutations = {
  [types.SET_ENTRIES]: (state, entries) => {
    state.entries.push(entries)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
