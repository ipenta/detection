import Vue from 'vue'
import Vuex from 'vuex'
import EntityVO from '@/service/model/EntityVO'
import * as service from '@/service/entity'

Vue.use(Vuex)

const state = {
  entity: new EntityVO()
}

const getters = {}

const actions = {
  addEntity({ commit, state }, payload) {
    service.addEntity(payload).then(context => {
      console.log(context)
    })
    // return service.addEntity(payload)
  }
}

const mutations = {}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
