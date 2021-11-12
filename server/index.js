const { query } = require('express');
const express = require('express');
const { Client } = require('pg')
const { formatRPSMetrics, formatRPSQuery } = require('./utils/formatRPS')
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

app.use('/rps-metric/', async (req, res, next) => {
  const timeframe = req.query.timeframe
  if (!timeframe) return
  let response = await client.query(formatRPSQuery(timeframe))

  let formattedResults = formatRPSMetrics(response.rows)
  res.send(formattedResults)
  //await client.end()
});

// Get data to populate the tracing table page
app.get('/traces', async (req, res, next) => {
  // Can I take out all objects out of query and construct a single query through it?
  // Worse UX in longer, less clear URL but easier dev experience
  // Would the SQL query even work?
  const start = req.query.start;
  const end = req.query.end;

  // SELECT the elements
  const selectQueryString = `SELECT * FROM traces WHERE trace_start_time BETWEEN TO_TIMESTAMP('${start}', 'YYYY-MM-DD HH:MI:SS') AND TO_TIMESTAMP('${end}', 'YYYY-MM-DD HH:MI:SS') ORDER BY trace_start_time desc;`;

  // Count the number of elements
  const countQueryString = ""

  const resultObj = {};

  await client
    .query(countQueryString)
    .then(count => resultObj.count = count)
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

// Starting the Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
