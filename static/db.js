const datastore = require('nedb-promise');

const Entity = datastore({filename: 'static/store/entity.json',autoload: true})

module.exports = {
  Entity: Entity
}
