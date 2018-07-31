import * as entityService from '@/service/entity'
import * as types from '@/store/mutation-type'

const state = {
  entities: []
}

const getters = {
  entities: state => state.entities
}

const actions = {
  searchEntities: ({ commit, state }, payload) => {
    return entityService.search(payload).then(results => {
      commit(types.SET_ENTITIES, results)
    })
  }
}

const mutations = {
  [types.SET_ENTITIES]: (state, entities) => {
    state.entities = entities
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
