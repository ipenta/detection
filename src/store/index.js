import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

import account from './modules/account'
import record from './modules/record'
import inspection from './modules/inspection'
import principal from './modules/principal'
import entity from './modules/entity'
import project from './modules/project'
import entry from './modules/entry'

Vue.use(Vuex)

let isDebugMode = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  getters,
  modules: {
    account,
    record,
    inspection,
    principal,
    entity,
    project,
    entry
  },
  strict: isDebugMode
})

// 热重载
if (module.hot) {
  module.hot.accept([
    './getters',
    './modules/account'
  ], () => {
    // 因为 babel 6 的模块编译格式问题，这里需要加上 .default
    store.hotUpdate({
      getters: require('./getters').default,
      modules: {
        account: require('./modules/account').default,
        inspection: require('./modules/inspection').default
      }
    })
  })
}

export default store
