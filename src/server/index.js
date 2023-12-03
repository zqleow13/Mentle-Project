const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Create SQLite database and table
const db = new sqlite3.Database('resources.db');
db.run('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT)');

// Hardcoded data
const resources = [
{   name: "Dementia Day Care",
    org: "Multiple Service Providers",
    type: "Day Care, Dementia",
    referral: "Referral required",
    free: "",
    location: "Multiple locations",
    info: "Seniors"
 },

{   name: "Eagles Mediation & Counselling Centre (EMCC)",
    org: "EMCC",
    type: "Counselling, Mediation, Marriage Prep",
    referral: "",
    free: "",
    location: "Bugis, Online",
    audience: "Individuals, Youths, Couples, Families"
},

{   name: "Live On! by TOUCH Community Services",
    org: "TOUCH Community Services Ltd",
    type: "Suicide Intervention, Mental Health",
    referral: "Referral required",
    free: "Free",
    location: "Bukit Merah, Home-based",
    audience: "Youths"
},
{
    name: "Community Intervention Team (COMIT)",
    org: "Multiple Service Providers",
    type: "Caregiver Support, Counselling, Dementia, Mental Health",
    referral: "",
    free: "",
    location: "Multiple locations, Home-based",
    audience: "Individuals, Caregivers"
},
{
    name: "Community Outreach Teams (CREST)",
    org: "Multiple Service Providers",
    type: "Caregiver Support, Counselling, Dementia, Mental Health",
    referral: "",
    free: "",
    location: "Multiple locations, Home-based",
    audience: "Individuals, Caregivers"
},
{
    name: "Our HEALing Voice",
    org: "Club HEAL",
    type: "Mental Health",
    referral: "Referral required",
    free: "Free",
    location: "Multiple locations",
    audience: "Individuals"
},
{
    name: "Melrose Care Counselling & Psychotherapy Services",
    org: "Children's Aid Society (CAS)",
    type: "Mental Health, Therapy, Counselling",
    referral: "",
    free: "",
    location: "Woodlands, Home-based",
    audience: "Children, Youths, Families"
},
{
    name: "Sober Living Framework (SLF)",
    org: "WE CARE Community Services Limited",
    type: "Addiction, Counselling",
    referral: "",
    free: "",
    location: "Eunos, Online, Helpline",
    audience: "Individuals, Families"
},
{
    name: "Project SAFE 1.1",
    org: "WE CARE Community Services Limited",
    type: "Addiction, Counselling, Support Group",
    referral: "Referral required",
    free: "",
    location: "Eunos, Online",
    audience: "Individuals, Families"
},
{
    name: "Mindset Learning Hub",
    org: "Singapore Association for Mental Health",
    type: "Employment Support, Mental Health",
    referral: "Referral required",
    free: "Free",
    location: "Jurong East, Online",
    audience: "Individuals"
},
{
    name: "Integrated Employment Services",
    org: "Singapore Anglican Community Services",
    type: "Employment Support, Mental Health",
    referral: "Referral required",
    free: "Free",
    location: "Simei, Online",
    audience: "Individuals"
},
{
    name: "Dementia Singapore Caregiver Support Services",
    org: "Dementia Singapore",
    type: "Dementia, Caregiver Support, Support Group",
    referral: "",
    free: "Free",
    location: "Simei, Online, Helpline",
    audience: "Individuals"
},
{
    name: "PPIS SYM Academy (Therapy Services)",
    org: "Persatuan Permudi Islam Singapura (PPIS)",
    type: "Counselling, Therapy",
    referral: "",
    free: "",
    location: "Ubi, Online",
    audience: "Individuals, Couples, Families"
},
{
    name: "Shan You Counselling & Casework",
    org: "Shan You",
    type: "Counselling, Mental Health, Marriage Prep",
    referral: "",
    free: "",
    location: "Kallang",
    audience: "Individuals, Children, Youths, Seniors, Couples"
},
{
    name: "A.I.R (Awareness, Identification & Referral)",
    org: "Silver Ribbon (Singapore)",
    type: "Counselling, Mental Health",
    referral: "",
    free: "Free",
    location: "Multiple Locations, Online",
    audience: "Individuals"
},
{
    name: "Care Corner Counselling Centre",
    org: "Care Corner Singapore Ltd",
    type: "Counselling, Therapy, Mental Health",
    referral: "",
    free: "",
    location: "Toa Payoh, Online, Helpline",
    audience: "Individuals, Couples, Families"
},
{
    name: "Care Corner Counselling Centre",
    org: "Care Corner Singapore Ltd",
    type: "Counselling, Therapy, Mental Health",
    referral: "",
    free: "",
    location: "Toa Payoh, Online, Helpline",
    audience: "Individuals, Couples, Families"
},
];

// Insert hardcoded data into the SQLite table
initialItems.forEach(item => {
  db.run('INSERT INTO items (name) VALUES (?)', [item.name]);
});

// API endpoint to fetch items
app.get('/api/items', (req, res) => {
  // Retrieve items from the SQLite table
  db.all('SELECT * FROM items', (err, rows) => {
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
