const express = require('express');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'student',
    password: 'root',
    port: 5434,
});


app.get('/my-endpoint', async (req, res) => {
    try {
        const city = req.query.city;
        const limit = req.query.limit;
        const offset = req.query.offset;

        const result = await pool.query("SELECT * FROM bank_details where \"CITY\" = '" + city + "' LIMIT " + limit + " OFFSET " + offset);

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
