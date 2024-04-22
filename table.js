const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('./watches.db', sqlite.OPEN_READWRITE, (err)=>
{
    if(err) return console.error()
});

const createWatchesTable = `
    CREATE TABLE IF NOT EXISTS watches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brand_name TEXT,
        model_name TEXT,
        price INTEGER,
        image TEXT,
        datetime TEXT,
        CONSTRAINT unique_model_date UNIQUE (model_name, datetime)
    )
`;

const createPriceHistoryTable = `
    CREATE TABLE IF NOT EXISTS price_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        watch_id INTEGER,
        price INTEGER,
        datetime TEXT,
        FOREIGN KEY (watch_id) REFERENCES watches(id)
    )
`;

const createLogoTable = `
    CREATE TABLE IF NOT EXISTS brand_logos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand_name TEXT NOT NULL UNIQUE,
    logo_url TEXT
    )
`;

db.run(createWatchesTable, (err) => {
    if (err) console.error('Error creating watches table:', err);
    else console.log('Watches table created successfully');
});

db.run(createPriceHistoryTable, (err) => {
    if (err) console.error('Error creating price history table:', err);
    else console.log('Price history table created successfully');
});

db.run(createLogoTable, (err) => {
    if (err) console.error('Error creating logo table:', err);
    else console.log('Logo table created successfully');
});