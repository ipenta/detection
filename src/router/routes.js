import Home from '@/views/Home'
import Record from '@/views/Record'
import Project from '@/views/Project'
import Inspection from '@/views/Inspection'
import Entry from '@/views/Entry'
import Principal from '@/views/Principal'
import Order from '@/views/Order'

const routes = [{
  path: '/',
  name: 'home',
  component: Home,
  children: [{
    path: 'record',
    name: 'record',
    component: Record
  }, {
    path: 'project',
    name: 'project',
    component: Project
  }, {
    path: 'inspection',
    name: 'inspection',
    component: Inspection
  }, {
    path: 'entry/:id',
    name: 'entry',
    component: Entry
  }, {
    path: 'principal',
    name: 'principal',
    component: Principal
  }, {
    path: 'order/:id',
    name: 'order',
    component: Order
  }]
}]

export default routes
