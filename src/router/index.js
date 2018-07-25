import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

import Record from '@/views/Record'
import Project from '@/views/Project'
import Detail from '@/views/Detail'

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
      path: 'detail',
      component: Detail
    }]
  }]
})
