import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '../../pharmacy.db');

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create tables
export const initializeDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          name TEXT NOT NULL,
          phone TEXT,
          address TEXT,
          role TEXT DEFAULT 'customer',
          isVerified INTEGER DEFAULT 0,
          createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
          updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Categories table
      db.run(`
        CREATE TABLE IF NOT EXISTS categories (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          image TEXT,
          isActive INTEGER DEFAULT 1,
          createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
          updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Medicines table
      db.run(`
        CREATE TABLE IF NOT EXISTS medicines (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          price REAL NOT NULL,
          originalPrice REAL,
          image TEXT,
          categoryId TEXT,
          inStock INTEGER DEFAULT 1,
          stockQuantity INTEGER DEFAULT 0,
          prescription INTEGER DEFAULT 0,
          activeIngredient TEXT,
          dosage TEXT,
          manufacturer TEXT,
          expiryDate TEXT,
          batchNumber TEXT,
          rating REAL DEFAULT 0,
          reviewCount INTEGER DEFAULT 0,
          sideEffects TEXT,
          contraindications TEXT,
          isActive INTEGER DEFAULT 1,
          createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
          updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (categoryId) REFERENCES categories (id)
        )
      `);

      // Cart table
      db.run(`
        CREATE TABLE IF NOT EXISTS cart (
          id TEXT PRIMARY KEY,
          userId TEXT NOT NULL,
          medicineId TEXT NOT NULL,
          quantity INTEGER NOT NULL,
          createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users (id),
          FOREIGN KEY (medicineId) REFERENCES medicines (id)
        )
      `);

      // Orders table
      db.run(`
        CREATE TABLE IF NOT EXISTS orders (
          id TEXT PRIMARY KEY,
          userId TEXT NOT NULL,
          status TEXT DEFAULT 'pending',
          totalAmount REAL NOT NULL,
          shippingAddress TEXT NOT NULL,
          paymentMethod TEXT DEFAULT 'cod',
          paymentStatus TEXT DEFAULT 'pending',
          prescriptionImage TEXT,
          notes TEXT,
          createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
          updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users (id)
        )
      `);

      // Order items table
      db.run(`
        CREATE TABLE IF NOT EXISTS order_items (
          id TEXT PRIMARY KEY,
          orderId TEXT NOT NULL,
          medicineId TEXT NOT NULL,
          quantity INTEGER NOT NULL,
          price REAL NOT NULL,
          createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (orderId) REFERENCES orders (id),
          FOREIGN KEY (medicineId) REFERENCES medicines (id)
        )
      `);

      // Prescriptions table
      db.run(`
        CREATE TABLE IF NOT EXISTS prescriptions (
          id TEXT PRIMARY KEY,
          userId TEXT NOT NULL,
          image TEXT NOT NULL,
          status TEXT DEFAULT 'pending',
          pharmacistId TEXT,
          notes TEXT,
          createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
          updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users (id),
          FOREIGN KEY (pharmacistId) REFERENCES users (id)
        )
      `);

      // Reviews table
      db.run(`
        CREATE TABLE IF NOT EXISTS reviews (
          id TEXT PRIMARY KEY,
          userId TEXT NOT NULL,
          medicineId TEXT NOT NULL,
          rating INTEGER NOT NULL,
          comment TEXT,
          createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users (id),
          FOREIGN KEY (medicineId) REFERENCES medicines (id)
        )
      `, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('All tables created successfully');
          resolve();
        }
      });
    });
  });
};