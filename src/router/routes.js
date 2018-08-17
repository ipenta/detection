import Home from '@/views/Home'
import RecordList from '@/views/record/list'
import RecordDetail from '@/views/record/detail'
import ProjectForm from '@/views/project/form'
import ProjectList from '@/views/project/list'
import InspectionForm from '@/views/inspection/form'
import InspectionList from '@/views/inspection/list'
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
    path: 'record',
    name: 'record',
    component: RecordList
  }, {
    path: 'record/detail/:id',
    name: 'record/detail',
    component: RecordDetail
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
    path: 'order/:id',
    name: 'order',
    component: OrderList
  }, {
    path: 'order/form',
    name: 'order/form',
    component: OrderForm
  }]
}]

export default routes
