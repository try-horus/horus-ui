const formatRPSMetrics = (metricRows) => {
  let newData = []
  metricRows.forEach(row => {
    let dataPoint = { x: new Date(row.time), y: row.requests || 0}
    newData.push(dataPoint)
  })

  return [
    {
      "id": "Requests Per Second",
      "color": "hsla(117, 100%, 40%, 1)",
      "data": newData
    }
  ]
}

const formatRPSQuery = ( timeframe ) => {
  let queryTimeframe = timeframe.replace("-", " ")

  let queryString = `
    SELECT time,
      (
        CASE
          WHEN value >= lag(value) OVER w
            THEN value - lag(value) OVER w
          WHEN lag(value) OVER w IS NULL THEN NULL
          ELSE value
        END
      ) AS "requests"
      FROM rps
      WHERE time > NOW() - INTERVAL '${queryTimeframe}'
      WINDOW w AS (ORDER BY time)
      ORDER BY time;
  `

  return queryString
}

module.exports = { formatRPSMetrics, formatRPSQuery }