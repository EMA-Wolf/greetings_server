require('dotenv').config();
const { Pool } = require('pg');

// Configure connection to PostgreSQL with connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Allows SSL connection without certificate validation
  },
//   ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // SSL if in production
});

module.exports = pool;
