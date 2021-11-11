import WaterfallChart from "../charts/WaterfallChart.jsx"
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
const axios = require("axios")

/*
  75bf3617b49cedcd16b62dafc2d4bec1 with these one there is a lot of delay before movies sends the response

  1526e5df651c2312fb171516dda90a87 this more normal, movies receives the request from dashboard and sends
  the response with a delay of 10 miliseconds. It still looks like a lot of delay

  1e085415db8566562ea3a5d696a658c7 is a trace that has an error so the request never reaches movies.js

  
  */

const oneTrace = () => {
  const router = useRouter()
  const { traceId } = router.query

  const [labels, setLabels] = useState(["span1", "span2", "span3", "span4", "span5"])
  const [datasets, setDatasets] = useState([{
    data: [[0,50], [1,4], [4,14], [14,29], [29,50]]
  }])
  const [listOfSortedSpans, setListOfSortedSpans] = useState([])

  useEffect(async () => {
    if(!router.isReady) return
 
    try {
      let response = await axios.get(`http://localhost:5000/traces/${traceId}`)
      response = response.data
      console.log(response)
      if (response !== undefined) {
      setLabels(response.map((span) => span.span_name))

      //const latencyData = [[0, response[0]["span_latency"]]]
      
      /*
        Get the starting time of the trace as a variable
        In all the spans, the first value will be
        startingTimeOfTheSpan - startingTimeOfTheTrace
        The second, upper value will be:
        startingTimeOfTheSpan - startingTimeOfTheTrace + latency
      */
      const latencyData = []
      const startingTimeOfTheTrace = response[0]["start_time_in_microseconds"]
      response.map((span) => {
        const baseValue = span.start_time_in_microseconds - startingTimeOfTheTrace
        latencyData.push([baseValue, baseValue + span.span_latency])
      })
      /*
      response.map((span, i) => {
        if (i !== 0) {
          latencyData.push([lowerValue, span.span_latency])
          start += span.span_latency
        }
      })*/
      setDatasets([{ data: latencyData }])
    }

    } catch(e) {
      console.log(e)
    }
  }, [router.isReady])

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
          <WaterfallChart labels={labels} datasets={datasets} />
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