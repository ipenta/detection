const store = require('../static/db.js');

const EntrySource = store.Entry;

const proxy = {
  'POST /api/entries': (req, resp) => {
    EntrySource.insert(req.body).then(results => {
      resp.json({
        status: 'success',
        data: results
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
  },
  'GET /api/entries': (req, resp) => {
    let query = req.query.text
    console.log(query)
    EntrySource.find({text: eval('/'+query+'/i')}).then(result => {
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
