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
  }
}
module.exports = proxy;
