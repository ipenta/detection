import entryService from '@/service/entry'
import * as types from '@/store/mutation-type'

const state = {
  entries: []
}

const getters = {
  entries: state => state.entries
}

const actions = {
  saveEntry({
    commit,
    state
  }, payload) {
    return entryService.save(payload)
  },
  getEntryByOrderId({
    commit,
    state
  }, payload) {
    return entryService.getEntryByOrderId(payload)
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
