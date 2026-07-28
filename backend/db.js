// db.js
require('dotenv').config();
const path = require('path');
const Database = require('better-sqlite3');
const dbFile = process.env.DB_FILE ||'database.db';
const db = new Database(path.join(__dirname, dbFile));
db.exec(`
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
email TEXT UNIQUE NOT NULL,
password TEXT NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

db.exec(`
CREATE TABLE IF NOT EXISTS events (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
description TEXT,
date TEXT NOT NULL,
time TEXT,
location TEXT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

db.exec(`
CREATE TABLE IF NOT EXISTS attendees (
id INTEGER PRIMARY KEY AUTOINCREMENT,
event_id INTEGER NOT NULL,
name TEXT NOT NULL,
email TEXT NOT NULL,
phone TEXT,
ticket_type TEXT,
status TEXT NOT NULL DEFAULT 'pending',
registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
)
`);
console.log(`✅ Database connected successfully (${dbFile})`);
module.exports = db;