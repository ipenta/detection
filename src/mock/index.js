import Mock from 'mockjs'
import projectApi from './project'
import entityApi from './entity'

Mock.setup({
  timeout: '400-600'
})

Mock.mock('http://test.cn', projectApi.getList)
Mock.mock('http://test.cn/entity/create', 'post', entityApi.create)
