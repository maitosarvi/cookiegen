import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const db = new Database(path.join(process.cwd(), 'fortunes.db'));

// Clear existing data
db.exec(`DROP TABLE IF EXISTS fortunes`);

// Create fresh table
db.exec(`
  CREATE TABLE fortunes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL
  )
`);

// Load fortunes from JSON file
const fortunesData = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'data', 'fortunes.json'), 'utf-8')
);
const fortunes = fortunesData.fortunes;

// Single transaction for all inserts
const insert = db.prepare('INSERT INTO fortunes (message) VALUES (?)');
const insertMany = db.transaction((fortunes) => {
  for (const fortune of fortunes) {
    insert.run(fortune);
  }
});

try {
  insertMany(fortunes);
  console.log('Database seeded successfully!');
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}

db.close();