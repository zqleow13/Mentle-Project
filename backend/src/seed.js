import sqlite from 'sqlite3';
import csv from 'fast-csv';
import fs from 'fs';

const sqlite3 = sqlite.verbose();

// Create SQLite database and connect to db
const db = new sqlite3.Database('resources.db', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the database');
    }
});

// Create resources table
db.run('CREATE TABLE IF NOT EXISTS resources (ID INTEGER PRIMARY KEY, Name TEXT UNIQUE, Organisation TEXT, Type TEXT, Audience TEXT, Location TEXT, Free TEXT, Referral TEXT)', (err) => {
    if (err) {
        console.error('Error creating table:', err.message);
    } else {
        console.log('Table created successfully');
    }
});

// Import data from CSV to SQLite
const csvFilePath = 'resourcesdata.csv';

const stream = fs.createReadStream(csvFilePath);

const processData = (data) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO resources (ID, Name, Organisation, Type, Audience, Location, Free, Referral) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [data.ID, data.Name, data.Organisation, data.Type, data.Audience, data.Location, data.Free, data.Referral], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
                console.log(data);
            }
        });
    });
};

const processCsv = () => {
    return new Promise((resolve, reject) => {
        csv
            .parseStream(stream, { headers: true })
            .on('data', async (data) => {
                console.log(data);
                try {
                    await processData(data);
                } catch (err) {
                    console.error('Error inserting data:', err.message);
                    reject(err);
                }
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
                resolve();
            });
    });
};

// Call the function to process the CSV data
processCsv()
    .then(() => {
        // Close the database connection after successful insertion
        db.close();
    })
    .catch((err) => {
        console.error('Error processing CSV:', err.message);
        db.close();
    });