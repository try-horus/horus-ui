import BarChart from "./charts/BarChart.jsx"
import WaterfallChart from "./charts/WaterfallChart.tsx"
import PieChart from "./charts/PieChart.jsx"


function oneTrace() {
  return (
    <div className="m-3">
    <header className="bg-blue-500 text-white p-10">
      <img className="rounded-lg w-24" src="horus-eye.png"/>
    </header>
    <main className="p-5" height="1000px">
      <div className="inline">
        <button class="w-36 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Return
        </button>
        <div className="bg-blue-500 p-3 text-white float-right">
            I am a trace ID 
        </div>
      </div>
      <div className="mt-5 flex h-full w-full">
        <div className="bg-white p-10 w-2/3 mr-5">
          <PieChart />
        </div>
        <div className="bg-green-200 p-10 w-1/3">
          I am the smaller attribute table 
        </div>
        

      </div>
    </main>
  </div>
  )
}


export default oneTrace