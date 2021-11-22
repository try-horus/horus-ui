const formatEPSMetrics = (errorRows) => {
  let newData = []
  errorRows.forEach(row => {
    let dataPoint = { x: new Date(row.time), y: row.errors || 0}
    newData.push(dataPoint)
  })

  return [
        {
      "id": "Errors Per Second",
      "color": "hsl(0, 100%, 70%)",
      "data": newData
    }
  ]
}

const formatEPSQuery = ( timeframe ) => {
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
      ) AS "errors"
      FROM eps
      WHERE time > NOW() - INTERVAL '${queryTimeframe}'
      WINDOW w AS (ORDER BY time)
      ORDER BY time;
  `

  return queryString
}

module.exports = { formatEPSMetrics, formatEPSQuery }
