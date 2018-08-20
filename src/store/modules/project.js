import projectService from '@/service/project'
import entityService from '@/service/entity'
import * as types from '@/store/mutation-type'

const state = {
  projects: [],
  owners: [],
  designers: [],
  supervisors: [],
  builders: []
}

const getters = {
  projects: state => state.projects,
  owners: state => state.owners,
  designers: state => state.designers,
  builders: state => state.builders,
  supervisors: state => state.supervisors
}

const actions = {
  searchProject: ({ commit, state }, payload) => {
    return projectService.search(payload).then(results => {
      commit(types.SET_PROJECTS, results)
    })
  },
  searchProjectForRecord: ({ commit, state }, payload) => {
    return projectService.search(payload)
  },
  searchEntity: ({ commit, state }, payload) => {
    return entityService.search(payload).then(results => {
      switch (payload.type) {
        case 'owner':
          console.log(results)
          commit(types.SET_OWNERS, results)
          break
        case 'designer':
          commit(types.SET_DESIGNERS, results)
          break
        case 'builder':
          commit(types.SET_BUILDERS, results)
          break
        case 'supervisor':
          commit(types.SET_SUPERVISORS, results)
          break
      }
    })
  },
  submit: ({ commit, state }, payload) => {
    return projectService.save(payload)
  },
  removeProject: ({ commit, state }, payload) => {
    return projectService.remove(payload)
  }
}

const mutations = {
  [types.SET_PROJECTS]: (state, projects) => {
    state.projects = projects
  },
  [types.SET_OWNERS]: (state, owners) => {
    state.owners = owners
  },
  [types.SET_DESIGNERS]: (state, designers) => {
    state.designers = designers
  },
  [types.SET_BUILDERS]: (state, builders) => {
    state.builders = builders
  },
  [types.SET_SUPERVISORS]: (state, supervisors) => {
    state.supervisors = supervisors
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
