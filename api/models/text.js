import db from '../db.js'

const Text = {
  create: (id, text, callback) => {
    const stmt = db.prepare("INSERT INTO clipboard VALUES (?,?)")
    stmt.run(id, text, callback)
    stmt.finalize()
  },
  getAll: (callback) => {
    db.all("SELECT * FROM clipboard", [], callback)
  }
}

export default Text
