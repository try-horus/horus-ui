const { time } = require("console")

const formatRPSMetrics = (metricRows) => {
  let newData = []
  metricRows.forEach(row => {
    let dataPoint = { x: new Date(row.time), y: row.value }
    newData.push(dataPoint)
  })
  return newData
}

module.exports = formatRPSMetrics

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