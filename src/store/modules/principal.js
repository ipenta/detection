import * as principalService from '@/service/principal'
import * as types from '@/store/mutation-type'

const state = {
  principals: []
}

const getters = {
  principals: state => state.principals
}

const actions = {
  searchPrincipals: ({ commit, state }, payload) => {
    return principalService.search(payload).then(results => {
      commit(types.SET_PRINCIPALS, results)
    })
  }
}

const mutations = {
  [types.SET_PRINCIPALS]: (state, principals) => {
    state.principals = principals
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
