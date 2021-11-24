const axios = require("axios")

import Header from "../components/pageHeader.jsx"
import TimeFrame from "../components/timeFrameForm.jsx"
import Dashboard from "../components/Dashboard.jsx"

import { useState, useEffect } from "react"

function About() {
  const [ timeFrame, setTimeframe ] = useState("15 minutes")
  const [ rpsData, setRPSData ] = useState(initialData)
  const [ epsData, setEPSData ] = useState(initialData)
  const [ latencyData, setLatencyData ] = useState(initialData)
  const [ refreshTime, setRefreshTime] = useState(Date.now())
  const [ timeSinceUpdate, setTimeSinceUpdate ] = useState(Date.now())
  const [ refreshClicked, setRefreshClicked ] = useState(false)
  const [ isDataEmpty, setIsDataEmpty ] = useState(true)

 

  useEffect(() => {
    getSQLforTimeFrame()
    let interval = setInterval(() => {
     setTimeSinceUpdate(Date.now())
    }, 60000)
    setRefreshTime(Date.now())
    setRefreshClicked(false)
    return () => {
      clearInterval(interval)
    }
  }, [timeFrame, refreshClicked])

  const getSQLforTimeFrame = () => {
    SQLRPS(timeFrame)
    SQLEPS(timeFrame)
    SQLLatency(timeFrame)
  }

  const SQLRPS = async (timeframe) => {
    const query = timeframe.replace(" ", "-")
    const response = await axios.get(`http://${window.location.hostname}:5001/rps-metric?timeframe=${query}`)
    console.log("getSQLforTimeFrame")
    console.log(response)
    setIsDataEmpty(response.data[0].data.length === 0)
    setRPSData(response.data)
  }

  const SQLEPS = async (timeframe) => {
    const query = timeframe.replace(" ", "-")
    const response = await axios.get(`http://${window.location.hostname}:5001/rps-error?timeframe=${query}`)
    setEPSData(response.data)
  }

  const SQLLatency = async (timeframe) => {
    const query = timeframe.replace(" ", "-")
    const response = await axios.get(`http://${window.location.hostname}:5001/latency?timeframe=${query}`)
    setLatencyData(response.data)
  }

  return (
    <>
      <Header />
      <main className="p-5">
        <h2 className="text-center text-4xl">Metrics</h2>
        <TimeFrame
          setTimeframe={setTimeframe}
          getSQLforTimeFrame={getSQLforTimeFrame}
          setRefreshTime={setRefreshTime}
          refreshTime={refreshTime}
          setTimeSinceUpdate={setTimeSinceUpdate}
          timeSinceUpdate={timeSinceUpdate}
          setRefreshClicked={setRefreshClicked}
          />
        {(isDataEmpty)
          ?  <div className="flex container justify-center mt-5">
              <h1 className="bg-yellow-300 p-3 rounded-lg">There are no available data points for this timeframe. Please select a wider timeframe.</h1>
            </div>
          : null
        }
        <Dashboard 
          rpsData={rpsData} 
          epsData={epsData} 
          latencyData={latencyData}
          />
      </main>
   </>
  )
}

const initialData = [
  {
    "id": "initializing data",
    "color": "hsl(65, 70%, 50%)",
    "data": [
    ]
  }
]

export default About