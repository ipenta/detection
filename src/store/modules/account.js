import * as userService from '@/service/sys/user'
import AccountVO from '@/service/model/sys/AccountVO'
import * as types from '@/store/mutation-type'

let userId = window.sessionStorage.userId || ''

const state = new AccountVO(userId)
const getters = {}
const actions = {
  logon({ commit, state }, payload) {
    return userService.findOne(payload).then(account => {
      commit(types.SET_ACCOUNT, account)
    })
  }
}
const mutations = {
  [types.SET_ACCOUNT] (state, data) {
    Object.assign(state, data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
