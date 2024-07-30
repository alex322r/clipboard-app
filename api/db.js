import s from 'sqlite3'
const sqlite3 = s.verbose()
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS clipboard (id INT, text TEXT)");
});

export default db;

