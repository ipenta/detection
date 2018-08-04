const store = require('../static/db.js');

const EntrySource = store.Entry;

const proxy = {
  'POST /api/entry': (req, resp) => {
    let data = req.body
    let id = data._id
    delete data._id
    let handler = (id !== '') ? EntrySource.update({_id:id},{$set:data},{upsert:true}) : EntrySource.insert(req.body)
    handler.then(results => {
      resp.json({
        status: 'success',
        msg: '更新成功'
      });
    }).catch(err => {
      resp.json({
        status: 'error',
        msg: err.errorType
      });
    })
  },
  'POST /api/entry/remove': (req, resp) => {
    EntrySource.remove({_id:req.body._id},{}).then(results => {
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
    EntrySource.find(req.query).then(results => {
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
