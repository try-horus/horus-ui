import LineChart from "./charts/LineChart.jsx"

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
        <div className="bg-blue-400 p-5 h-screen">
          <LineChart />
        </div>
        <div className="bg-red-400 p-5">
          <canvas id="EPS" ></canvas>
        </div>
        <div className="bg-green-400 p-10 flex">
          <canvas id="Latency" ></canvas>
        </div>
      </div>
    </main>
  </div>
    )
}

export default About