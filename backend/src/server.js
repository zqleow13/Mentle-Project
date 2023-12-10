import express from 'express';
import sqlite from 'sqlite3';
import cors from 'cors';

const app = express();
const port = 3000;

const sqlite3 = sqlite.verbose();
app.use(cors());

// Connect to the SQLite database
const db = new sqlite3.Database('resources.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database');
  }
});

// API endpoint to fetch items
app.get('/api/resources', (req, res) => {
  // Retrieve items from the SQLite table
  db.all('SELECT * FROM resources', (err, rows) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

// API endpoint for searching
app.get('/api/search', (req, res) => {
  const searchTerm = req.query.term;
  const query = `SELECT * FROM resources WHERE name LIKE '%${searchTerm}%'`;

  db.all(query, (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(rows);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
