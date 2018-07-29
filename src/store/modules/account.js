import * as userService from '@/service/sys/user'

const state = {}
const getters = {}
const actions = {
  logon({ commit, state }, payload) {
    return userService.findOne(payload).then(account => {
      console.log(account)
    })
  }
}
const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
