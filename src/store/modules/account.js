import * as userService from '@/service/sys/user'
import * as types from '@/store/mutation-type'

const state = {
  token: '',
  email: ''
}

const getters = {
  hasLogon: state => state.token,
  email: state => state.email
}

const actions = {
  logon({ commit, state }, payload) {
    return userService.findOne(payload).then(account => {
      commit(types.SET_TOKEN, account.token)
      commit(types.SET_EMAIL, account.email)
    })
  }
}

const mutations = {
  [types.SET_TOKEN]: (state, token) => {
    state.token = token
  },
  [types.SET_EMAIL]: (state, email) => {
    state.email = email
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
