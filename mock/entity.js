const proxy = {
  'POST /api/entity': (req, resp) => {
    resp.send(req.body)
  }
}
module.exports = proxy;
