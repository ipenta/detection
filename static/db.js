const datastore = require('nedb-promise');

const Entity = datastore({filename: 'static/store/entity.json',autoload: true})
const Project = datastore({filename: 'static/store/project.json',autoload: true})
const Inspection = datastore({filename: 'static/store/inspection.json',autoload: true})
const Entry = datastore({filename: 'static/store/entry.json',autoload: true})

module.exports = {
  Entity: Entity,
  Project: Project,
  Inspection: Inspection,
  Entry: Entry
}
