const store = require('../static/db.js');

const UserSource = store.User;

const proxy = {
  'POST /api/user': (req, resp) => {
    let email = req.body.email
    let password = req.body.password
    UserSource.findOne({
      email: email,
      password: password
    }).then(result => {
      if (result) {
        result.token = 'amdina'
        resp.json({ status: 'success', data: result, msg: '' })
      } else {
        resp.json({ status: 'error', msg: 'nofind'})
      }
    })
  }
}
module.exports = proxy;
