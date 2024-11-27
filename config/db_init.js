const pool = require('./db');

const createTables = async () => {
  // SQL queries to drop existing tables
  const dropGreetingsTableQuery = `DROP TABLE IF EXISTS greetings CASCADE;`;
  const dropUsersTableQuery = `DROP TABLE IF EXISTS users CASCADE;`;

  // SQL queries to create new tables
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
      password VARCHAR(255) NOT NULL,
      student_id VARCHAR(255) UNIQUE NOT NULL
    );
  `;

  try {
    // Drop existing tables
    console.log('Dropping existing tables...');
    await pool.query(dropGreetingsTableQuery);
    console.log('Table "greetings" has been dropped.');

    await pool.query(dropUsersTableQuery);
    console.log('Table "users" has been dropped.');

    // Create new tables
    console.log('Creating new tables...');
    await pool.query(createGreetingsTableQuery);
    console.log('Table "greetings" has been created.');

    await pool.query(createUsersTableQuery);
    console.log('Table "users" has been created.');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

module.exports = createTables;
