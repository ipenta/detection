const store = require('../static/db.js');

const InspectionSource = store.Inspection;

const proxy = {
  'POST /api/inspection': (req, resp) => {
    InspectionSource.insert(req.body).then(result => {
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
  'GET /api/inspection/search': (req, resp) => {
    let text = req.query.text
    let query = {}
    if (text) {
      query = { text: eval('/'+text+'/i') }
    }
    InspectionSource.find(query).then(result => {
      resp.json({
        status: 'success',
        data: result
      })
    })
  }
}
module.exports = proxy;
