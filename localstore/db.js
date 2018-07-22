const datastore = require('nedb-promise');

const Entity = datastore({filename: 'localstore/store/entity.json',autoload: true})

module.exports = {
  Entity: Entity
}
