import LineChart from "./charts/LineChart.jsx"

const rpsData = [
  {
    "id": "Requests Per Day",
    "color": "hsl(65, 70%, 50%)",
    "data": [
      { "x": new Date('July 20, 21 00:20:18'), "y": 7 },
      { "x": new Date('July 27, 21 00:22:18'), "y": 2 },
      { "x": new Date("2021-11-04 17:24:35.131"), "y": 13 },
      { "x": new Date(1636413980587), "y": 6 }
    ]
  }
]
  
const epsData = [
  {
    "id": "Errors Per Day",
    "color": "hsl(65, 70%, 50%)",
    "data": [
      { "x": new Date('July 20, 21 00:20:18'), "y": 0 },
      { "x": new Date('July 27, 21 00:22:18'), "y": 1 },
      { "x": new Date("2021-11-04 17:24:35.131"), "y": 2 },
      { "x": new Date(1636413980587), "y": 1 }
    ]
  }
]

const latencyData = [
  {
    "id": "Latency",
    "color": "hsl(65, 70%, 50%)",
    "data": [
      { "x": new Date('July 20, 21 00:20:18'), "y": 200 },
      { "x": new Date('July 27, 21 00:22:18'), "y": 200 },
      { "x": new Date("2021-11-04 17:24:35.131"), "y": 200 },
      { "x": new Date(1636413980587), "y": 250 }
    ]
  }
]

function About() {
  return (
    <div className="m-3">
    <header className="bg-blue-500 text-white p-10">
      <img className="rounded-lg w-24" src="horus-eye.png"/>
    </header>
    <main className="p-5" height="1000px">
      <div className="flex justify-end">
        <form className="bg-blue-300 p-4 rounded-lg" action="#">
          <label for="timeframe">Timeframe</label>
          <select name="timeframe" id="timeframe">
            <option value="15 minutes">15 minutes</option>
            <option value="1 hour">1 hour</option>
            <option value="4 hours">4 hours</option>
            <option value="24 hours">24 hours</option>
            <option value="1 week">1 week</option>
          </select>
          <input type="submit" value="Select" />
        </form>
      </div>
      <div className="mt-5 justify-center">
        <div className="p-5">
          <LineChart data={rpsData} schemeColour={"accent"}/>
        </div>
        <div className="p-5">
          <LineChart data={epsData} schemeColour={"set1"}/>
        </div>
        <div className="p-5">
          <LineChart data={latencyData} schemeColour={"paired"} />
        </div>
      </div>
    </main>
  </div>
    )
}

export default About