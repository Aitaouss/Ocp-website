import sqlite3 from "sqlite3";
import path from "path";

// Create database connection
const dbPath = path.resolve(__dirname, "../../database.sqlite");

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

// Initialize database tables
export const initializeDatabase = () => {
  db.serialize(() => {
    // Create users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Productions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          user_id INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES users(id)
    )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS ProductionValues (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          production_id INTEGER NOT NULL,
          sector TEXT NOT NULL,
          value REAL NOT NULL,
          FOREIGN KEY (production_id) REFERENCES Productions(id)
    )
    `);

    console.log("Database tables initialized");
  });
};

// Close database connection
export const closeDatabase = () => {
  db.close((err) => {
    if (err) {
      console.error("Error closing database:", err.message);
    } else {
      console.log("Database connection closed");
    }
  });
};
