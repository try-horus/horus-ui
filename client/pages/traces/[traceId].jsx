import WaterfallChart from "../charts/WaterfallChart.jsx"
import ButtonToGoBack from "../../components/ButtonToGoBack"
import ButtonToFilterTraces from "../../components/ButtonToFilterTraces"
import SpanTables from "../../components/SpanTables"

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

  const [labels, setLabels] = useState([])
  const [datasets, setDatasets] = useState([{
    data: []
  }])
  const [listOfSortedSpans, setListOfSortedSpans] = useState([])
  const [clickedSpan, setClickedSpan] = useState({})

  useEffect(async () => {
    if(!router.isReady) return
 
    try {
      let response = await axios.get(`http://localhost:5001/traces/${traceId}`)
      response = response.data
      setListOfSortedSpans(response)
      setClickedSpan(response[0])
      console.log("RESPONSE", response)
      if (response !== undefined) {
      setLabels(response.map((span) => span.span_name))
      
      /*
        Get the starting time of the trace as a variable
        In all the spans, the first value will be
        startingTimeOfTheSpan - startingTimeOfTheTrace
        The second, upper value will be:
        startingTimeOfTheSpan - startingTimeOfTheTrace + latency
      */
      const latencyData = []
      const startingTimeOfTheTrace = response[0]["start_time_in_microseconds"]
      
      // This code is okay, the problem is that there is empty space in the traces that
      // is not accounted for
      response.map((span) => {
        console.log(span)
        const baseValue = span.start_time_in_microseconds - startingTimeOfTheTrace
        console.log("AHHHHHHH", span.start_time_in_microseconds)
        console.log("MORE AHHHH", startingTimeOfTheTrace)

        latencyData.push([baseValue, baseValue + span.span_latency])
      })
      setDatasets([{ data: latencyData }])
    }

    } catch(e) {
      console.log(e)
    }
  }, [router.isReady])

  const handleClickOnChart = (event, arrayOfInfo) => {
    if (arrayOfInfo[0] !== undefined) {
      const index = arrayOfInfo[0]["index"]
      setClickedSpan(listOfSortedSpans[index])
    }
  }

  console.log(clickedSpan)
  return (
    <div className="m-3">
    <header className="bg-blue-500 text-white p-10">
      <img className="rounded-lg w-24" alt="horusLogo" src="../../public/horus-eye.png"/>
    </header> 
    <main className="p-5" height="1000px">
      <div className="inline">
        <ButtonToGoBack />
        <ButtonToFilterTraces />
        <div className="bg-blue-500 p-3 text-white float-right">
            Trace id: {traceId}
        </div>
      </div>
      <div className="mt-5 flex h-full w-full">
        <div className="bg-white p-5 mr-0 h-full w-full">
          <WaterfallChart labels={labels} datasets={datasets} handleClickOnChart={handleClickOnChart} />
        </div>
        
      </div>
      <SpanTables span={clickedSpan} />
    </main>
  </div>
  )
}




export default oneTrace