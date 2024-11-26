const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./config/db');
const initDB = require('./config/db_init');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors('*'));
app.use(bodyParser.json());

// Initialize the database table
initDB();

// CRUD Endpoints

// GET: Fetch all greeting cards
app.get('/greetings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM greetings');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching greetings:', err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET: Fetch a single greeting card by ID
app.get('/greetings/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query('SELECT * FROM greetings WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Greeting card not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching greeting:', err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST: Create a new greeting card
app.post('/greetings', async (req, res) => {
  const { title, message } = req.body;

  if (!title || !message) {
    return res.status(400).json({ message: 'Title and message are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO greetings (title, message) VALUES ($1, $2) RETURNING *',
      [title, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating greeting:', err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PUT: Update an existing greeting card by ID
app.put('/greetings/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, message } = req.body;

  if (!title || !message) {
    return res.status(400).json({ message: 'Title and message are required' });
  }

  try {
    const result = await pool.query(
      'UPDATE greetings SET title = $1, message = $2 WHERE id = $3 RETURNING *',
      [title, message, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Greeting card not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating greeting:', err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// DELETE: Remove a greeting card by ID
app.delete('/greetings/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query('DELETE FROM greetings WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Greeting card not found' });
    }
    res.status(204).send(); // No content
  } catch (err) {
    console.error('Error deleting greeting:', err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
