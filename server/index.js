const express = require('express');
const { Client } = require('pg')
const { formatRPSMetrics, formatRPSQuery } = require('./utils/formatRPS')
require('dotenv').config();

/*
const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})*/
//const connectionString = process.env.PG

const connectionString = "postgres://juan:juan@localhost:5432/horus"
console.log(connectionString)
const client = new Client({connectionString})
client.connect()
  .then(() => console.log("Connected successfully to the database"))
  .catch(error => console.log(error))
//TODO: need to add client.end() somewhere

const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.use('/rps-metric/', async (req, res, next) => {  
  const timeframe = req.query.timeframe
  if (!timeframe) return
  let response = await client.query(formatRPSQuery(timeframe))

  let formattedResults = formatRPSMetrics(response.rows)
  res.send(formattedResults)
  //await client.end()
});

app.get('/traces/:traceId', async (req, res) => {

  const traceId = req.params.traceId
  const getAllSpansFromTraceText = 'SELECT * FROM spans WHERE trace_id=$1;'
  let sortedArrayOfSpans

  try {
    const { rows } = await client.query(getAllSpansFromTraceText, [traceId])
    sortedArrayOfSpans = rows.sort((a, b) => a.start_time_in_microseconds - b.start_time_in_microseconds)
  } catch(err) {
    console.log("\nError when reading from the database\n")
    console.log(err.stack)
    res.send([]).status(500)
  }

  res.json(sortedArrayOfSpans)
})
  
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
