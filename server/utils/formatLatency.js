const formatLatencyMetrics = (latencyRows) => {
  let newData = {
      "500": {
          "id": "500 ms",
          "color": "hsl(83, 95%, 71%)",
          "data": []
          }, 
      "1500": {
          "id": "1500 ms",
          "color": "hsl(47, 100%, 71%)",
          "data": []
          },
      "1500+":{
            "id": "1500+ ms",
            "color": "hsl(0, 100%, 70%)",
            "data": []
          }
  }

  latencyRows.forEach(entry => {
    Object.keys(entry).forEach(key => {
      let newLatencyPoint = { x: entry.time, y: null }
      if ( key === "time" ) return
      newLatencyPoint.y = entry[key]
      newData[key].data.push(newLatencyPoint)
    })
  })

  let finalData = [] 
  
  Object.keys(newData).forEach(key => {
    finalData.push(newData[key])
  })

  return finalData
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
          WHEN bucket_1500 >= lag(bucket_1500) OVER w
            THEN bucket_1500 - lag(bucket_1500) OVER w
          WHEN lag(bucket_1500) OVER w IS NULL THEN NULL
          ELSE bucket_1500
        END
      ) AS "1500",
      (
        CASE
          WHEN bucket_over_1500 >= lag(bucket_over_1500) OVER w
            THEN bucket_over_1500 - lag(bucket_over_1500) OVER w
          WHEN lag(bucket_over_1500) OVER w IS NULL THEN NULL
          ELSE bucket_over_1500
        END
      ) AS "1500+"
      FROM latency
      WHERE time > NOW() - INTERVAL '${queryTimeframe}'
      WINDOW w AS (ORDER BY time)
      ORDER BY time;
  `

  return queryString
}

module.exports = { formatLatencyMetrics, formatLatencyQuery }
