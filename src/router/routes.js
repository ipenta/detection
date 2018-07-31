import Home from '@/views/Home'
import RecordForm from '@/views/record/form'
import RecordList from '@/views/record/list'
import ProjectForm from '@/views/project/form'
import ProjectList from '@/views/project/list'
import InspectionForm from '@/views/inspection/form'
import InspectionList from '@/views/inspection/list'
import PrincipalForm from '@/views/principal/form'
import PrincipalList from '@/views/principal/list'
import OrderForm from '@/views/order/form'
import OrderList from '@/views/order/list'
import EntityList from '@/views/entity/list'
import EntryList from '@/views/entry/list'
import EntryForm from '@/views/entry/form'

const routes = [{
  path: '/',
  name: 'home',
  component: Home,
  children: [{
    path: 'record/form',
    name: 'record/form',
    component: RecordForm
  }, {
    path: 'record',
    name: 'record',
    component: RecordList
  }, {
    path: 'project/form',
    name: 'project/form',
    component: ProjectForm
  }, {
    path: 'project',
    name: 'project',
    component: ProjectList
  }, {
    path: 'entity',
    name: 'entity',
    component: EntityList
  }, {
    path: 'inspection',
    name: 'inspection',
    component: InspectionList
  }, {
    path: 'inspection/form',
    name: 'inspection/form',
    component: InspectionForm
  }, {
    path: 'entry',
    name: 'entry',
    component: EntryList
  }, {
    path: 'entry/form',
    name: 'entry/form',
    component: EntryForm
  }, {
    path: 'principal',
    name: 'principal',
    component: PrincipalList
  }, {
    path: 'principal/form',
    name: 'principal/form',
    component: PrincipalForm
  }, {
    path: 'order',
    name: 'order',
    component: OrderList
  }, {
    path: 'order/form',
    name: 'order/form',
    component: OrderForm
  }]
}]

export default routes
