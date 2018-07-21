let ENTITY = 'entity'

const entities = [{
  name: '北京建设公司',
  type: '1'
}, {
  name: '长沙建设公司',
  type: '1'
}, {
  name: '广州建设公司',
  type: '1'
}, {
  name: '上海建设公司',
  type: '1'
}, {
  name: '北京监理公司',
  type: '4'
}, {
  name: '长沙监理公司',
  type: '4'
}, {
  name: '上海监理公司',
  type: '4'
}, {
  name: '长沙设计公司',
  type: '2'
}, {
  name: '上海设计公司',
  type: '2'
}, {
  name: '上海施工公司',
  type: '3'
}]

export default {
  create: res => {
    let item = JSON.parse(res.body)[ENTITY]
    if (item != null) {
      entities.forEach(entity => {
        if (entity.name === item.name) {
          return {
            error: 'fail'
          }
        }
      })
    }
    entities.push(item)
    return {
      status: 200
    }
  },
  find: res => {}
}
