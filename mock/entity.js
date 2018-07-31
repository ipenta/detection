const store = require('../static/db.js');

const EntitySource = store.Entity;

const proxy = {
  'POST /api/entity': (req, resp) => {
    EntitySource.insert(req.body).then(result => {
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
    EntitySource.find({
      type: type,
      name: eval('/'+name+'/i')
    }).then(result => {
      resp.json({
        status: 'success',
        data: result
      })
    })
  },
  'GET /api/entity/search': (req, resp) => {
    let name = req.query.name
    let query = {}
    if (name) {
      query = { name: eval('/'+name+'/i') }
    }
    console.log(query)
    EntitySource.find(query).then(result => {
      console.log(result)
      resp.json({
        status: 'success',
        data: result
      })
    })
  }
}
module.exports = proxy;
