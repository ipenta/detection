import Mock from 'mockjs'

let list = Mock.mock({
  'name': '@name',
  'age|1-10': 10
})

export default {
  getList: config => {
    return list
  }
}
