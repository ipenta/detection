import * as projectService from '@/service/project'
import * as types from '@/store/mutation-type'

const state = {
  projects: []
}

const getters = {
  projects: state => state.projects
}

const actions = {
  searchProjects: ({ commit, state }, payload) => {
    return projectService.search(payload).then(results => {
      commit(types.SET_PROJECTS, results)
    })
  }
}

const mutations = {
  [types.SET_PROJECTS]: (state, projects) => {
    state.projects = projects
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
