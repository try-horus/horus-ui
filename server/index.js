const express = require('express');
const { Client } = require('pg')
const formatRPSMetrics = require('./utils/formatRPSMetrics')
require('dotenv').config();

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})
 
client.connect()

const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.use('/rps-metric', async (req, res, next) => {
  let response = await client.query('SELECT * FROM rps LIMIT 5;')
  let formattedResults = formatRPSMetrics(response.rows)
  console.log(formattedResults)
  res.send(formattedResults)
  await client.end()
});
  
// Error Handling
app.use((req, res, next) => {
  const error = new Error("Could not find this route.", 404);
  throw error;
});

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(err.code || 500);
  res.json({ error: err.message || "An unknown error occured" });
});

// Starting the Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
