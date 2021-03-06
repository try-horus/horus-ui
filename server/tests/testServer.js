const { query } = require('express');
const express = require('express');
const { Pool } = require('pg')
const { formatRPSMetrics, formatRPSQuery } = require('../utils/formatRPS')
const { formatEPSMetrics, formatEPSQuery } = require('../utils/formatEPS')
const { formatLatencyMetrics, formatLatencyQuery } = require('../utils/formatLatency')

require('dotenv').config();

const client = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

//const connectionString = "postgres://juan:juan@localhost:5432/horus"
// const connectionString = `postgres://horus_admin:horus_admin@localhost:5434/horus`

client.connect()
  .then(() => console.log("Connected successfully to the database"))
  .catch(error => console.log(error))

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 

app.use(express.json());

// ROUTING:
app.use('/rps-metric/', async (req, res, next) => {
  const timeframe = req.query.timeframe

  if (!timeframe) {
    res.status(404).send("You must provide a given timeframe")
  } else {
    let response = await client.query(formatRPSQuery(timeframe))
    let formattedResults = formatRPSMetrics(response.rows)
    res.status(200).send(formattedResults)
  }
});
 
app.use('/rps-error/', async (req, res, next) => {  
  const timeframe = req.query.timeframe
  if (!timeframe) {
    res.status(404).send("You must provide a given timeframe")
  } else {
    let response = await client.query(formatEPSQuery(timeframe))
    let formattedResults = formatEPSMetrics(response.rows)
    res.status(200).send(formattedResults)
  }
});

app.use('/latency/', async (req, res, next) => {  
  const timeframe = req.query.timeframe
  if (!timeframe) {
    res.status(404).send("You must provide a given timeframe")
  } else {
    let response = await client.query(formatLatencyQuery(timeframe))
    let formattedResults = formatLatencyMetrics(response.rows)
    res.status(200).send(formattedResults)
  }
});

// Get data to populate the tracing table page
app.get('/traces/', async (req, res, next) => {
  const start = req.query.start;
  const end = req.query.end;
  const resultObj = {};

  if (start === "undefined" || end === "undefined") return 

  const selectQueryString = `SELECT * FROM traces WHERE trace_start_time BETWEEN '${start}' AND '${end}' ORDER BY trace_start_time desc;`;

  await client
    .query(selectQueryString)
    .then(traces => resultObj.traces = traces.rows)
    .catch((err) => console.log(err));

  console.log(resultObj)

  res.send(resultObj)
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

// Exporting app to be tested by Jest:
module.exports = { app, client };