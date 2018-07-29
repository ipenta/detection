import Vue from 'vue'
import Router from 'vue-router'
import Routes from './routes'
Vue.use(Router)

const defaultRoutes = [{
  path: '/logon',
  name: 'logon',
  component: (resolve) => require(['@/views/sys/Logon'], resolve)
}, {
  path: '/register',
  name: 'register',
  component: (resolve) => require(['@/views/sys/Register'], resolve)
}]

const pageRouter = new Router({
  routes: defaultRoutes.concat(Routes)
})

pageRouter.beforeEach((to, from, next) => {
  console.log(to, from)
  next()
})

export default pageRouter
