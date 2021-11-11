const formatLatencyMetrics = (latencyRows) => {
  let newData = []
  latencyRows.forEach(row => {
    let dataPoint = { x: new Date(row.time), y: row.errors || 0}
    newData.push(dataPoint)
  })

  return [
    {
      "id": "Latency Data",
      "color": "hsl(65, 70%, 50%)",
      "data": newData
    }
  ]
}

const formatLatencyQuery = ( timeframe ) => {
  let queryTimeframe = timeframe.replace("-", " ")

  let queryString = `
    SELECT time,
      (
        CASE
          WHEN bucket_500 >= lag(bucket_500) OVER w
            THEN bucket_500 - lag(bucket_500) OVER w
          WHEN lag(bucket_500) OVER w IS NULL THEN NULL
          ELSE bucket_500
        END
      ) AS "500",
      (
        CASE
          WHEN bucket_1000 >= lag(bucket_1000) OVER w
            THEN bucket_1000 - lag(bucket_1000) OVER w
          WHEN lag(bucket_1000) OVER w IS NULL THEN NULL
          ELSE bucket_1000
        END
      ) AS "1000",
      (
        CASE
          WHEN bucket_1500 >= lag(bucket_1500) OVER w
            THEN bucket_1500 - lag(bucket_1500) OVER w
          WHEN lag(bucket_1500) OVER w IS NULL THEN NULL
          ELSE bucket_1500
        END
      ) AS "1500",
      (
        CASE
          WHEN bucket_2000 >= lag(bucket_2000) OVER w
            THEN bucket_2000 - lag(bucket_2000) OVER w
          WHEN lag(bucket_2000) OVER w IS NULL THEN NULL
          ELSE bucket_2000
        END
      ) AS "2000",
      (
        CASE
          WHEN bucket_2500 >= lag(bucket_2500) OVER w
            THEN bucket_2500 - lag(bucket_2500) OVER w
          WHEN lag(bucket_2500) OVER w IS NULL THEN NULL
          ELSE bucket_2500
        END
      ) AS "2500",
      (
        CASE
          WHEN bucket_over_2500 >= lag(bucket_over_2500) OVER w
            THEN bucket_over_2500 - lag(bucket_over_2500) OVER w
          WHEN lag(bucket_over_2500) OVER w IS NULL THEN NULL
          ELSE bucket_over_2500
        END
      ) AS "2500+"
      FROM latency
      WHERE time > NOW() - INTERVAL '1 hour'
      WINDOW w AS (ORDER BY time)
      ORDER BY time;
  `

  return queryString
}

module.exports = { formatLatencyMetrics, formatLatencyQuery }