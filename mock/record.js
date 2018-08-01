const store = require('../static/db.js');

const RecordSource = store.Record;

const proxy = {
  'POST /api/record': (req, resp) => {
    RecordSource.insert(req.body).then(result => {
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
  'GET /api/record': (req, resp) => {
    let title = req.query.title
    let query = {}
    if (title) {
      query = { title: eval('/'+title+'/i') }
    }
    RecordSource.find(query).then(result => {
      resp.json({
        status: 'success',
        data: result
      });
    }).catch(err => {
      resp.json({
        status: 'error',
        msg: err.errorType
      });
    })
  }
}
module.exports = proxy;
