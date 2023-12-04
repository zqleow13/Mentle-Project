const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 5173;

// Create SQLite database and table
const db = new sqlite3.Database('resources.db', (err) => {
    if (err) {
      console.error('Error connecting to the database:', err.message);
    } else {
      console.log('Connected to the database');
    }
  });

db.run('CREATE TABLE IF NOT EXISTS resources (id INTEGER PRIMARY KEY, name TEXT UNIQUE, org TEXT, type TEXT, referral TEXT, free TEXT, location TEXT, audience TEXT)', (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table created successfully');
    }
  });

// Hardcoded data
// const resources = [
// {   id: 1,
//     name: "Dementia Day Care",
//     org: "Multiple Service Providers",
//     type: "Dementia",
//     referral: "Referral required",
//     free: "",
//     location: "Multiple locations",
//     audience: "Seniors"
//  },

// {   id: 2,
//     name: "Eagles Mediation & Counselling Centre (EMCC)",
//     org: "EMCC",
//     type: "Counselling, Mediation, Marriage Prep",
//     referral: "",
//     free: "",
//     location: "Bugis, Online",
//     audience: "Individuals, Youths, Couples, Families"
// },

// {   id: 3,
//     name: "Live On! by TOUCH Community Services",
//     org: "TOUCH Community Services Ltd",
//     type: "Suicide Intervention, Mental Health",
//     referral: "Referral required",
//     free: "Free",
//     location: "Bukit Merah, Home-based",
//     audience: "Youths"
// },
// {   id: 4,
//     name: "Community Intervention Team (COMIT)",
//     org: "Multiple Service Providers",
//     type: "Caregiver Support, Counselling, Dementia, Mental Health",
//     referral: "",
//     free: "",
//     location: "Multiple locations, Home-based",
//     audience: "Individuals, Caregivers"
// },
// {   id: 5,
//     name: "Community Outreach Teams (CREST)",
//     org: "Multiple Service Providers",
//     type: "Caregiver Support, Counselling, Dementia, Mental Health",
//     referral: "",
//     free: "",
//     location: "Multiple locations, Home-based",
//     audience: "Individuals, Caregivers"
// },
// {   id: 6,
//     name: "Our HEALing Voice",
//     org: "Club HEAL",
//     type: "Mental Health",
//     referral: "Referral required",
//     free: "Free",
//     location: "Multiple locations",
//     audience: "Individuals"
// },
// {   id: 7,
//     name: "Melrose Care Counselling & Psychotherapy Services",
//     org: "Children's Aid Society (CAS)",
//     type: "Mental Health, Therapy, Counselling",
//     referral: "",
//     free: "",
//     location: "Woodlands, Home-based",
//     audience: "Children, Youths, Families"
// },
// {   id: 8,
//     name: "Sober Living Framework (SLF)",
//     org: "WE CARE Community Services Limited",
//     type: "Addiction, Counselling",
//     referral: "",
//     free: "",
//     location: "Eunos, Online, Helpline",
//     audience: "Individuals, Families"
// },
// {   id: 9,
//     name: "Project SAFE 1.1",
//     org: "WE CARE Community Services Limited",
//     type: "Addiction, Counselling, Support Group",
//     referral: "Referral required",
//     free: "",
//     location: "Eunos, Online",
//     audience: "Individuals, Families"
// },
// {   id: 10,
//     name: "Mindset Learning Hub",
//     org: "Singapore Association for Mental Health",
//     type: "Employment Support, Mental Health",
//     referral: "Referral required",
//     free: "Free",
//     location: "Jurong East, Online",
//     audience: "Individuals"
// },
// {   id: 11,
//     name: "Integrated Employment Services",
//     org: "Singapore Anglican Community Services",
//     type: "Employment Support, Mental Health",
//     referral: "Referral required",
//     free: "Free",
//     location: "Simei, Online",
//     audience: "Individuals"
// },
// {   id: 12,
//     name: "Dementia Singapore Caregiver Support Services",
//     org: "Dementia Singapore",
//     type: "Dementia, Caregiver Support, Support Group",
//     referral: "",
//     free: "Free",
//     location: "Multiple locations, Online, Helpline",
//     audience: "Individuals"
// },
// {   id: 13,
//     name: "PPIS SYM Academy (Therapy Services)",
//     org: "Persatuan Permudi Islam Singapura (PPIS)",
//     type: "Counselling, Therapy",
//     referral: "",
//     free: "",
//     location: "Ubi, Online",
//     audience: "Individuals, Couples, Families"
// },
// {   id: 14,
//     name: "Shan You Counselling & Casework",
//     org: "Shan You",
//     type: "Counselling, Mental Health, Marriage Prep",
//     referral: "",
//     free: "",
//     location: "Kallang",
//     audience: "Individuals, Children, Youths, Seniors, Couples"
// },
// {   id: 15,
//     name: "A.I.R (Awareness, Identification & Referral)",
//     org: "Silver Ribbon (Singapore)",
//     type: "Counselling, Mental Health",
//     referral: "",
//     free: "Free",
//     location: "Multiple Locations, Online",
//     audience: "Individuals"
// },
// {   id: 16,
//     name: "Care Corner Counselling Centre",
//     org: "Care Corner Singapore Ltd",
//     type: "Counselling, Therapy, Mental Health",
//     referral: "",
//     free: "",
//     location: "Toa Payoh, Online, Helpline",
//     audience: "Individuals, Couples, Families"
// },
// {   id: 17,
//     name: "Caregivers-to-Caregivers Programme",
//     org: "Caregivers Alliance Limited",
//     type: "Caregiver Support, Mental Health",
//     referral: "",
//     free: "Free",
//     location: "Tiong Bahru, Online",
//     audience: "Individuals"
// },
// {   id: 18,
//     name: "Counselling and Care Centre (CCC)",
//     org: "Counselling and Care Centre",
//     type: "Counselling, Therapy, Mental Health, Marriage Prep",
//     referral: "",
//     free: "",
//     location: "Chinatown, Online",
//     audience: "Individuals, Couples, Children, Families"
// },
// {   id: 19,
//     name: "Counselling for Older Persons Programme",
//     org: "O'Joy Limited",
//     type: "Counselling, Caregiver Support",
//     referral: "",
//     free: "",
//     location: "Kallang, Online",
//     audience: "Individuals, Seniors"
// },
// {   id: 20,
//     name: "Family Support and Counselling Programme",
//     org: "WINGS Counselling Centre",
//     type: "Counselling, Therapy, Mental Health",
//     referral: "",
//     free: "",
//     location: "Bartley, Online",
//     audience: "Individuals, Children, Youths, Couples, Families"
// },
// {   id: 21,
//     name: "Hua Mei Counselling and Coaching Programme",
//     org: "Hua Mei Centre for Successful Ageing",
//     type: "Counselling, Therapy, Mental Health, Caregiver Support",
//     referral: "",
//     free: "",
//     location: "Tiong Bahru, Online",
//     audience: "Individuals, Seniors, Families"
// },
// {   id: 22,
//     name: "Local Outreach to Suicide Survivors (LOSS)",
//     org: "Samaritans Of Singapore",
//     type: "Mental Health, Support Group, Counselling",
//     referral: "",
//     free: "Free",
//     location: "Tanjong Pagar, Online",
//     audience: "Individuals"
// },
// {   id: 23,
//     name: "SAGE Counselling Service",
//     org: "SAGE Counselling Centre",
//     type: "Mental Health, Counselling",
//     referral: "",
//     free: "Free",
//     location: "Jurong West, Online",
//     audience: "Individuals, Seniors"
// },
// {   id: 24,
//     name: "SAMH Insight Centre",
//     org: "Singapore Assiociation for Mental Health",
//     type: "Mental Health, Counselling",
//     referral: "",
//     free: "Free",
//     location: "Toa Payoh, Online, Helpline",
//     audience: "Individuals, Families"
// },
// {   id: 25,
//     name: "SAMH Group Homes",
//     org: "Singapore Assiociation for Mental Health",
//     type: "Mental Health, Counselling, Employment Support",
//     referral: "Referral required",
//     free: "",
//     location: "Bukit Batok",
//     audience: "Individuals"
// },
// {   id: 26,
//     name: "SAMH Oasis Day Centre",
//     org: "Singapore Assiociation for Mental Health",
//     type: "Mental Health, Counselling",
//     referral: "Referral required",
//     free: "",
//     location: "Potong Pasir",
//     audience: "Individuals"
// },
// {   id: 27,
//     name: "SAMH Youthreach",
//     org: "Singapore Assiociation for Mental Health",
//     type: "Mental Health, Counselling",
//     referral: "Referral required",
//     free: "Free",
//     location: "Tiong Bahru",
//     audience: "Youths"
// },
// {   id: 28,
//     name: "SOS Suicide Crisis Intervention Programme",
//     org: "Samaritans Of Singapore",
//     type: "Mental Health, Suicide Intervention",
//     referral: "",
//     free: "Free",
//     location: "Tanjong Pagar, Online, Helpline",
//     audience: "Individuals"
// },
// {   id: 29,
//     name: "The Seniors Helpline",
//     org: "SAGE Counselling Centre",
//     type: "Mental Health, Caregiver Support",
//     referral: "",
//     free: "Free",
//     location: "Helpline",
//     audience: "Individuals, Seniors"
// },
// {   id: 30,
//     name: "Voices for Hope",
//     org: "Dementia Singapore",
//     type: "Mental Health, Dementia, Caregiver Support",
//     referral: "",
//     free: "Free",
//     location: "Bendemeer, Online",
//     audience: "Individuals, Seniors"
// },
// ];

// Insert hardcoded data into the SQLite table
resources.forEach(resource => {
    db.run('INSERT INTO resources (id, name, org, type, referral, free, location, audience) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [resource.id, resource.name, resource.org, resource.type, resource.referral, resource.free, resource.location, resource.audience]);
  });
  

// API endpoint to fetch items
app.get('/api/resources', (req, res) => {
  // Retrieve items from the SQLite table
  db.all('SELECT * FROM resources', (err, rows) => {
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
