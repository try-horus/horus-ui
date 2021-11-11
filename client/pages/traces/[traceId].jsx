import WaterfallChart from "../charts/WaterfallChart.jsx"
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
const axios = require("axios")



const data = {
  labels: ["span1", "span2", "span3", "span4", "span5",],
  datasets: [{
    data: [[0,50], [1,4], [4,14], [14,29], [29,50]]
  }]
}

const options = {
  type: 'bar',
  //responsive: true,
  //maintainAspectRatio: false,
  aspectRatio: 2,
  indexAxis: 'y',
  plugins:{   
    legend: {
      display: false
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Span Duration (microseconds)',
      }
    },
    y: {
      title: {
        display: true,
        text: 'Span Id',
      }
    },
  },
  skipNull: true,

  backgroundColor: [
    'rgba(54, 127, 143, 1)',
    'rgba(73, 173, 175, 1)',
    'rgba(104, 194, 191, 1)',
    'rgba(242, 188, 70, 1)',
    'rgba(228, 135, 76, 1)',
    'rgba(223, 86, 77, 1)',
    'rgba(243, 224, 181, 1)',
    'rgba(39, 29, 63, 1)',
  ],

  onClick(e) {
    alert("Hello")
  },
}

const oneTrace = () => {
  const router = useRouter()
  const { traceId } = router.query
  return (
    <div className="m-3">
    <header className="bg-blue-500 text-white p-10">
      <img className="rounded-lg w-24" alt="horusLogo" src="../../public/horus-eye.png"/>
    </header> 
    <main className="p-5" height="1000px">
      <div className="inline">
        <button className="w-36 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Return
        </button>
        <div className="bg-blue-500 p-3 text-white float-right">
            Trace id: {traceId}
        </div>
      </div>
      <div className="mt-5 flex h-full w-full">
        <div className="bg-white p-10 w-2/3 mr-5">
          <WaterfallChart data={data} options={options} />
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