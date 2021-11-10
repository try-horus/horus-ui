const { time } = require("console")

const formatRPSMetrics = (metricRows) => {
  let newData = []
  metricRows.forEach(row => {
    let dataPoint = { x: new Date(row.time), y: row.requests || 0}
    newData.push(dataPoint)
  })

  return [
    {
      "id": "Requests Per Day",
      "color": "hsl(65, 70%, 50%)",
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

// const fifteenMins = [
//   {
//     "id": "Requests Per Day",
//     "color": "hsl(65, 70%, 50%)",
//     "data": [
//       { "x": new Date('July 20, 21 00:20:18'), "y": 7 },
//       { "x": new Date('July 20, 21 00:22:19'), "y": 2 },
//       { "x": new Date('July 20, 21 00:33:20'), "y": 4 },
//       { "x": new Date('July 20, 21 00:34:23'), "y": 1 },
//       { "x": new Date('July 20, 21 00:35:23'), "y": 5 },
//     ]
//   }
// ]