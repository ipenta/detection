import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

import EntityVO from '@/service/model/EntityVO'

import account from './modules/account'
import record from './modules/record'
import inspection from './modules/inspection'
import principal from './modules/principal'
import entity from './modules/entity'

Vue.use(Vuex)

let isDebugMode = process.env.NODE_ENV !== 'production'

const state = {
  entity: new EntityVO(),
  message: {
    showClose: true,
    message: '',
    type: 'success',
    duration: 2000
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    account,
    record,
    inspection,
    principal,
    entity
  },
  strict: isDebugMode
})

// 热重载
if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations',
    './modules/account'
  ], () => {
    // 因为 babel 6 的模块编译格式问题，这里需要加上 .default
    store.hotUpdate({
      getters: require('./getters').default,
      actions: require('./actions').default,
      mutations: require('./mutations').default,
      modules: {
        account: require('./modules/account').default
      }
    })
  })
}

export default store
