const store = require('../static/db.js');

const EntrySource = store.Entry;

const proxy = {
  'POST /api/entry': (req, resp) => {
    console.log(req.body)
    EntrySource.insert(req.body).then(result => {
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
  'GET /api/entry': (req, resp) => {
    EntrySource.find(req.query).then(result => {
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
