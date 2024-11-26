const pool = require('./db');

const createTables = async () => {
  // SQL queries to create the tables
  const createGreetingsTableQuery = `
    CREATE TABLE IF NOT EXISTS greetings (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      message TEXT NOT NULL
    );
  `;

  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;

  try {
    // Execute queries
    await pool.query(createGreetingsTableQuery);
    console.log('Table "greetings" has been created or already exists.');

    await pool.query(createUsersTableQuery);
    console.log('Table "users" has been created or already exists.');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

module.exports = createTables;
