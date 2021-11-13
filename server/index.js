const { query } = require('express');
const express = require('express');
const { Client } = require('pg')
const { formatRPSMetrics, formatRPSQuery } = require('./utils/formatRPS')
const { formatEPSMetrics, formatEPSQuery } = require('./utils/formatEPS')
const { formatLatencyMetrics, formatLatencyQuery } = require('./utils/formatLatency')

require('dotenv').config();

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

client.connect()
// need to add client.end() somewhere

const app = express();
const port = process.env.PORT || 5001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 

app.use(express.json());

// ROUTING:
app.use('/rps-metric/', async (req, res, next) => {
  const timeframe = req.query.timeframe
  if (!timeframe) return
  let response = await client.query(formatRPSQuery(timeframe))
  let formattedResults = formatRPSMetrics(response.rows)
  res.send(formattedResults)
});
 
app.use('/rps-error/', async (req, res, next) => {  
  const timeframe = req.query.timeframe
  if (!timeframe) return
  let response = await client.query(formatEPSQuery(timeframe))
  let formattedResults = formatEPSMetrics(response.rows)
  res.send(formattedResults)
});

app.use('/latency/', async (req, res, next) => {  
  const timeframe = req.query.timeframe
  if (!timeframe) return
  let response = await client.query(formatLatencyQuery(timeframe))
  let formattedResults = formatLatencyMetrics(response.rows)
  res.send(formattedResults)
});

// Get data to populate the tracing table page
app.get('/traces/', async (req, res, next) => {
  const start = req.query.start;
  const end = req.query.end;

  if (start === "undefined" || end === "undefined") return 

  const selectQueryString = `SELECT * FROM traces WHERE trace_start_time BETWEEN '${start}' AND '${end}' ORDER BY trace_start_time desc;`;
  const countQueryString = `SELECT COUNT(*) FROM traces WHERE trace_start_time BETWEEN '${start}' AND '${end}';`

  const resultObj = {};

  await client
    .query(countQueryString)
    .then(query => {
      resultObj.count = Number(query.rows[0].count);
    })
    .catch(err => console.log(err))

  await client
    .query(selectQueryString)
    .then(traces => resultObj.traces = traces.rows)
    .catch((err) => console.log(err));

  res.send(resultObj)
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

// Starting the Server:
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});

// http://localhost:3000/traces?start=2021-11-12%2015:03:15&end=2021-11-12%2015:12:13