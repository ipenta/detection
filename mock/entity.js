const store = require('../static/db.js');

const proxy = {
  'POST /api/entity': (req, resp) => {
    store.Entity.insert(req.body).then(result => {
      console.log(result)
      resp.json({
        status: 'success',
        msg: '插入成功！'
      });
    }).catch(err => {
      resp.json({
        status: 'error',
        msg: err.errorType
      });
    })
  },
  'POST /api/entity/list': (req, resp) => {
    let type = req.body.type
    let name = req.body.name
    store.Entity.find({
      type: type,
      name: eval('/'+name+'/i')
    }).then(result => {
      resp.json({
        status: 'success',
        data: result
      })
    })
  }
}
module.exports = proxy;
