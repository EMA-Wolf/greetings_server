const pool = require('./db');

const createTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS greetings (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      message TEXT NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Table "greetings" has been created or already exists.');
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

module.exports = createTable;
