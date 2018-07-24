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
  'GET /api/entity/:name': (req, resp) => {
    store.Entity.findOne(req.params).then(result => {
      // resp.status(500).json({ data: result });
      resp.send("Sample response for /all_timezones");
    })
  }
}
module.exports = proxy;
