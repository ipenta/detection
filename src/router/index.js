import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

import Record from '@/views/Record'
import Project from '@/views/Project'
import Inspection from '@/views/Inspection'
import Entry from '@/views/Entry'
import Principal from '@/views/Principal'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Home,
    children: [{
      path: 'record',
      component: Record
    }, {
      path: 'project',
      component: Project
    }, {
      path: 'inspection',
      component: Inspection
    }, {
      path: 'entry',
      component: Entry
    }, {
      path: 'principal',
      component: Principal
    }]
  }]
})
