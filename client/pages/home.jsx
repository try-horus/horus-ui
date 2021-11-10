const axios = require("axios")

import LineChart from "./charts/LineChart.jsx"
import { useState, useEffect } from "react"


function About() {
  const [ timeFrame, setTimeframe ] = useState("15 minutes")
  const [ rpsData, setRPSData ] = useState(fifteenMins)
  // const [ epsData, setEPSData ] = useState("15 minutes")
  // const [ latencyData, setLatencyData ] = useState("15 minutes")

  const handleTimeFrameSelect = (e) => { 
    setTimeframe(e.target.value)
  }

  useEffect(() => {
    getSQLforTimeFrame()
  }, [timeFrame])

  const getSQLforTimeFrame = () => {
    SQLRPS(timeFrame)
    // SQLEPS(timeFrame)
    // SQLLatency(timeFrame)
  }

  const SQLRPS = async (timeframe) => {
    const query = timeframe.replace(" ", "-")
    const response = await axios.get(`http://localhost:5000/rps-metric?timeframe=${query}`)
    setRPSData(response.data)
  }

  // const SQLEPS = (timeframe) => {
  //   // GENERATE DYNAMIC SQL STATEMENT USING A SWITCH CASE TO SET THE TIME VALUE TO 
  //   // THE TIMEFRAME ARGUMENT
  //   switch (timeFrame) {
  //     case "15 minutes":
  //       setEPSData(fifteenMins) 
  //       break
  //     case "1 hour":
  //       setEPSData(oneHour)
  //       break
  //     case "4 hours":
  //       setEPSData(fourHours)
  //       break
  //     case "24 hours":
  //       setEPSData(twentyFourHours)
  //       break
  //   }
  // }

  // const SQLLatency = (timeframe) => {
  //   // GENERATE DYNAMIC SQL STATEMENT USING A SWITCH CASE TO SET THE TIME VALUE TO 
  //   // THE TIMEFRAME ARGUMENT
  //   switch (timeFrame) {
  //     case "15 minutes":
  //       setLatencyData(fifteenMins) 
  //       break
  //     case "1 hour":
  //       setLatencyData(oneHour)
  //       break
  //     case "4 hours":
  //       setLatencyData(fourHours)
  //       break
  //     case "24 hours":
  //       setLatencyData(twentyFourHours)
  //       break
  //   }
  // }

  return (
    <div className="m-3">
    <header className="bg-blue-500 text-white p-10">
      <img className="rounded-lg w-24" src="horus-eye.png"/>
    </header>
    <main className="p-5" height="1000px">
      <div className="flex justify-end">
        <form className="bg-blue-300 p-4 rounded-lg" action="#">
          <label for="timeframe">Timeframe</label>
          <select name="timeframe" id="timeframe" onChange={(e) => handleTimeFrameSelect(e)}>
            <option value="15 minutes">15 minutes</option>
            <option value="1 hour">1 hour</option>
            <option value="4 hours">4 hours</option>
            <option value="24 hours">24 hours</option>
            <option value="1 week">1 week</option>
          </select>
        </form>
      </div>
      <div className="mt-5 justify-center">
        <div className="p-5">
          <LineChart data={rpsData} schemeColour={"accent"}/>
        </div>
{/*        <div className="p-5">
          <LineChart data={epsData} schemeColour={"set1"}/>
        </div>
        <div className="p-5">
          <LineChart data={latencyData} schemeColour={"paired"} />
        </div>*/}
      </div>
    </main>
  </div>
  )
}


const fifteenMins = [
  {
    "id": "Requests Per Day",
    "color": "hsl(65, 70%, 50%)",
    "data": [
      { "x": new Date('July 20, 21 00:20:18'), "y": 7 },
      { "x": new Date('July 20, 21 00:22:19'), "y": 2 },
      { "x": new Date('July 20, 21 00:33:20'), "y": 4 },
      { "x": new Date('July 20, 21 00:34:23'), "y": 1 },
      { "x": new Date('July 20, 21 00:35:23'), "y": 5 },
    ]
  }
]


const oneHour = [
  {
    "id": "Requests Per Day",
    "color": "hsl(65, 70%, 50%)",
    "data": [
      { "x": new Date('July 20, 21 00:20:18'), "y": 7 },
      { "x": new Date('July 20, 21 00:35:19'), "y": 2 },
      { "x": new Date('July 20, 21 00:38:20'), "y": 4 },
      { "x": new Date('July 20, 21 00:50:23'), "y": 1 },
      { "x": new Date('July 20, 21 01:15:23'), "y": 5 },
    ]
  }
]


// TEST DATA:
// const epsData = [
//   {
//     "id": "Errors Per Day",
//     "color": "hsl(65, 70%, 50%)",
//     "data": [
//       { "x": new Date('July 20, 21 00:20:18'), "y": 0 },
//       { "x": new Date('July 27, 21 00:22:18'), "y": 1 },
//       { "x": new Date("2021-11-04 17:24:35.131"), "y": 2 },
//       { "x": new Date(1636413980587), "y": 1 }
//     ]
//   }
// ]

// const latencyData = [
//   {
//     "id": "Latency",
//     "color": "hsl(65, 70%, 50%)",
//     "data": [
//       { "x": new Date('July 20, 21 00:20:18'), "y": 200 },
//       { "x": new Date('July 27, 21 00:22:18'), "y": 200 },
//       { "x": new Date("2021-11-04 17:24:35.131"), "y": 200 },
//       { "x": new Date(1636413980587), "y": 250 }
//     ]
//   }
// ]

export default About