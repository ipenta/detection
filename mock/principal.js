const store = require('../static/db.js');

const PrincipalSource = store.Principal;

const proxy = {
  'POST /api/principal': (req, resp) => {
    console.log(req.body)
    PrincipalSource.insert(req.body).then(result => {
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
  'GET /api/principal/search': (req, resp) => {
    let name = req.query.name
    let query = {}
    if (name) {
      query = { name: eval('/'+name+'/i') }
    }
    PrincipalSource.find(query).then(result => {
      resp.json({
        status: 'success',
        data: result
      })
    })
  }
}
module.exports = proxy;
