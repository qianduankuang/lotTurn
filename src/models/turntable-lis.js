import Nedb from 'nedb'
import dbHelp from './db'
const db = new Nedb({
  filename: 'list',
  autoload: true
})


db.ensureIndex({ fieldName: 'listId', unique: true }, function (err) {})

export default dbHelp(db)