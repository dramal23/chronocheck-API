const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('./watches.db', sqlite.OPEN_READWRITE, (err)=>
{
    if(err) return console.error()
});

const sql = `CREATE TABLE IF NOT EXISTS watches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand_name TEXT,
    model_name TEXT,
    price INTEGER,
    image TEXT,
    datetime TEXT,
    CONSTRAINT unique_model_date UNIQUE (model_name, datetime)
)`

db.run(sql);