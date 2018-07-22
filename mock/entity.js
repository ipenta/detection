const store = require('../localstore/db.js');

const proxy = {
  'POST /api/entity': (req, resp) => {
    store.Entity.insert(req.body).then((err, ret) => {
      resp.send({ status: 'success', message: '插入成功！' });
    })
  },
  'GET /api/entity/:name': (req, resp) => {
    store.Entity.findOne(req.params).then(result => {
      resp.send({ status: 'success', data: result });
    })

  }
}
module.exports = proxy;
