const axios = require("axios")

import LineChart from "./charts/LineChart.jsx"
import { useState, useEffect } from "react"

function About() {
  const [ timeFrame, setTimeframe ] = useState("15 minutes")
  const [ rpsData, setRPSData ] = useState(initialData)
  const [ epsData, setEPSData ] = useState(initialData)
  const [ latencyData, setLatencyData ] = useState(initialData)

  const handleTimeFrameSelect = (e) => { 
    setTimeframe(e.target.value)
  }

  useEffect(() => {
    getSQLforTimeFrame()
  }, [timeFrame])

  const getSQLforTimeFrame = () => {
    SQLRPS(timeFrame)
    SQLEPS(timeFrame)
    SQLLatency(timeFrame)
  }

  const SQLRPS = async (timeframe) => {
    const query = timeframe.replace(" ", "-")
    const response = await axios.get(`http://localhost:5000/rps-metric?timeframe=${query}`)
    if (response.data[0].data.length === 0) { 
      alert("There are no available data points for this timeframe. Please select a different timeframe.") 
    } 
    setRPSData(response.data)
  }

  const SQLEPS = async (timeframe) => {
    const query = timeframe.replace(" ", "-")
    const response = await axios.get(`http://localhost:5000/rps-error?timeframe=${query}`)
    setEPSData(response.data)
  }

  const SQLLatency = async (timeframe) => {
    const query = timeframe.replace(" ", "-")
    const response = await axios.get(`http://localhost:5000/latency?timeframe=${query}`)
    console.log(response.data)
    setLatencyData(response.data)
  }

  return (
    <div className="m-3">
    <header className="bg-blue-500 text-white p-10">
      <img className="rounded-lg w-24" src="horus-eye.png"/>
    </header>
    <main className="p-5" height="1000px">
      <div className="flex justify-end">
        <form className="bg-blue-300 p-4 rounded-lg" action="#">
          <label for="timeframe">Timeframe: </label>
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
        <div className="p-5">
          <LineChart data={epsData} schemeColour={"set1"}/>
        </div>
        <p className="text-sm text-gray-400 text-center">*Note: if the graph doesn’t seem to refresh when selecting a wider timeframe, it’s likely that you don’t have data that goes back that far. Please check your database dates.</p>
        <div className="p-5">
          <LineChart data={latencyData} schemeColour={"paired"} />
        </div>
      </div>
    </main>
  </div>
  )
}

const initialData = [
  {
    "id": "initial rps",
    "color": "hsl(65, 70%, 50%)",
    "data": [
    ]
  }
]

export default About