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

app.get('/traces', async (req, res, next) => {
  const delta = Number(req.query.delta) || 1440;

  const miliToSecond = 1000;
  const secondsToMinute = 60;

  // Make SQL-legible dates
  const start = new Date(new Date().getTime() - (miliToSecond * secondsToMinute * delta)).toISOString().split("T").join(" ");
  const end = new Date().toISOString().split("T").join(" ");

  // Order desc to ensure correct order
  const queryString = `SELECT * FROM traces WHERE trace_start_time BETWEEN '${start}' AND '${end}' ORDER BY trace_start_time desc;`;

  client
    .query(queryString)
    .then((resp) => {
      res.json(resp.rows)
      // client.end();
    })
    .catch((err) => console.log(err));
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
