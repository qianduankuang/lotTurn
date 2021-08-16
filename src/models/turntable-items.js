import Nedb from 'nedb'
import dbHelp from './db'
const db = new Nedb({
  filename: 'items',
  autoload: true
})



export default dbHelp(db)