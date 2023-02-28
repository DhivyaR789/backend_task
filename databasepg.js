const { Pool } = require('pg');
const express = require('express')

const app = express()

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.listen(3000);


// const client = new Client({
//     host: 'dpg-cfuuret3t39doauuoeng-a.singapore-postgres.render.com',
//     user: 'root',
//     port: 5432,
//     password: 'H0aRoFa9dw3M3D6STGtb8U37kQmgQOKe',
//     database: 'student_25nq '
// });

const connectionString = 'postgres://root:H0aRoFa9dw3M3D6STGtb8U37kQmgQOKe@dpg-cfuuret3t39doauuoeng-a.singapore-postgres.render.com/student_25nq';

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
    // ca: fs.readFileSync('./render-ca.pem').toString()
  }
});

// client.connect();

pool.query(`COPY bank_branches FROM 'D:\Additionals\task\bank_data.csv' DELIMITER ','CSV HEADER;`, (err, res) => {
    if (!err) {
        console.log('DB created');
    } else {

        console.log(err);
    }
    // client.end;
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