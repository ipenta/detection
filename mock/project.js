const store = require('../static/db.js');

const ProejctSource = store.Project;

const proxy = {
  'POST /api/project': (req, resp) => {
    console.log(req.body)
    ProejctSource.insert(req.body).then(result => {
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
  'GET /api/project/search': (req, resp) => {
    let name = req.query.name
    ProejctSource.find({
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
