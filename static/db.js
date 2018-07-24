const datastore = require('nedb-promise');

const Entity = datastore({filename: 'static/store/entity.json',autoload: true})
const Project = datastore({filename: 'static/store/project.json',autoload: true})

module.exports = {
  Entity: Entity,
  Project: Project
}
