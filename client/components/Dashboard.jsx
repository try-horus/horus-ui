import LineChart from "../pages/charts/LineChart"

function Dashboard( { rpsData, epsData, latencyData } ) {  
  return (
    <div className="mt-5 justify-center">
      <div className="px-5">
        <LineChart data={rpsData} chartName="Total Requests Per 10 Seconds"/>
      </div>
      <p className="text-sm text-gray-400 text-center">*Note: if the graph doesn’t seem to refresh when selecting a wider timeframe, it’s likely that you don’t have data that goes back that far. Please check your database dates.</p>
      <div className="px-5">
        <LineChart data={epsData} chartName="Errors Per 10 Seconds"/>
      </div>
      <div className="px-5">
        <LineChart data={latencyData} style={"natural"} chartName="Latency Health"/>
      </div>
    </div>
  )
}

export default Dashboard;
