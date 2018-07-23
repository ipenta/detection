const store = require('../static/db.js');
const resultvo = require('../static/resultvo.js');

const proxy = {
  'POST /api/entity': (req, resp) => {
    store.Entity.insert(req.body).then(result => {
      console.log(result)
      resp.json({
        status: 'success',
        msg: '插入成功！'
      });
    }).catch(err => {
      console.log(err);
      resp.json({
        status: 'fail',
        msg: '插入失败！'
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
