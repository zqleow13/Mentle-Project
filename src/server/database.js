const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const csv = require('fast-csv');
const fs = require('fs');
const app = express();
const port = 3000;

// Create SQLite database and table
const db = new sqlite3.Database('resources.db', (err) => {
    if (err) {
    console.error('Error connecting to the database:', err.message);
    } else {
    console.log('Connected to the database');
    }
});

db.run('CREATE TABLE IF NOT EXISTS resources (ID INTEGER PRIMARY KEY, Name TEXT UNIQUE, Organisation TEXT, Type TEXT, Audience TEXT, Location TEXT, Free TEXT, Referral TEXT)', (err) => {
    if (err) {
        console.error('Error creating table:', err.message);
    } else {
        console.log('Table created successfully');
    }
    });

// Import data from CSV to SQLite
const csvFilePath = 'resources.csv';

const stream = fs.createReadStream(csvFilePath);

csv
    .parseStream(stream, { headers: true })
    .on('data', (data) => {
        db.run('INSERT INTO resources (ID, Name, Organisation, Type, Audience, Location, Free, Referral) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [data.ID, data.Name, data.Organisation, data.Type, data.Audience, data.Location, data.Free, data.Referral], (err) => {
            if (err) {
            console.error('Error inserting data:', err.message);
            } else {
            console.log('Data inserted successfully');
            }
        });
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
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
 
  
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
