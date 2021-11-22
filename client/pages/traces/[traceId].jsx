import WaterfallChart from "../charts/WaterfallChart.jsx";
import Breadcrumb from "../../components/Breadcrumb"
import SpanTables from "../../components/SpanTables";
import Header from "../../components/pageHeader";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import IndividualTraceHeader from "../../components/individualTraceHeader.jsx";
const axios = require("axios");

/*
  75bf3617b49cedcd16b62dafc2d4bec1 with these one there is a lot of delay before movies sends the response

  1526e5df651c2312fb171516dda90a87 this more normal, movies receives the request from dashboard and sends
  the response with a delay of 10 miliseconds. It still looks like a lot of delay

  1e085415db8566562ea3a5d696a658c7 is a trace that has an error so the request never reaches movies.js

  */

const oneTrace = () => {
  const router = useRouter();
  const { traceId } = router.query;

  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([
    {
      data: [],
    },
  ]);
  const [listOfSortedSpans, setListOfSortedSpans] = useState([]);
  const [clickedSpan, setClickedSpan] = useState({});
  const [listOfFilteredSpans, setListOfFilteredSpans] = useState([])
  const [filterOfSpans, setFilterOfSpans] = useState("HTTP Spans")
  const [showSpanInfo, setShowSpanInfo] = useState(false)

  useEffect(async () => {
    if (!router.isReady) return;

    try {
      let response = await axios.get(`${process.env.UI_SERVER_HOST}/traces/${traceId}`);
      response = response.data;
      setListOfSortedSpans(response);
    } catch (e) {
      console.log(e);
    }
  }, [router.isReady]);

  useEffect(() => {
    setListOfFilteredSpans(listOfSortedSpans)
    selectSpansBasedOnDropdown()
  }, [listOfSortedSpans]);

  useEffect(() => {
    if (listOfFilteredSpans.length === 0) return
    setClickedSpan(listOfFilteredSpans[0])

    if (listOfFilteredSpans !== undefined) {
      setLabels(listOfFilteredSpans.map((span) => span.span_name));

      /*
      Get the starting time of the trace as a variable
      In all the spans, the first value will be
      startingTimeOfTheSpan - startingTimeOfTheTrace
      The second, upper value will be:
      startingTimeOfTheSpan - startingTimeOfTheTrace + latency
    */
    if (filterOfSpans !== "Non-HTTP Spans") {
      const latencyData = [];
      const startingTimeOfTheTrace =
        listOfFilteredSpans[0]["start_time_in_microseconds"];

      // This code is okay, the problem is that there is empty space in the traces that
      // is not accounted for
      listOfFilteredSpans.map((span) => {
        const baseValue =
          span.start_time_in_microseconds - startingTimeOfTheTrace;
        latencyData.push([baseValue, baseValue + span.span_latency]);
      });
      setDatasets([{ data: latencyData }]);
    } else {
      const latencyData = []
      let starting = 0
      let ending = 0
      listOfFilteredSpans.map((span) => {
        starting = ending
        ending = starting + span.span_latency
        latencyData.push([starting, ending]);
      });
      setDatasets([{ data: latencyData }]);
    }
      
    }

  }, [listOfFilteredSpans]);

  useEffect(() => {
    // set listOfFilteredSpans to the result of filtering the listOfSortedSpans
    selectSpansBasedOnDropdown()
  }, [filterOfSpans]);

  const handleClickOnChart = (event, arrayOfInfo) => {
    if (arrayOfInfo[0] !== undefined) {
      const index = arrayOfInfo[0]["index"];
      setClickedSpan(listOfSortedSpans[index]);
      setShowSpanInfo(true)
    }
  };

  const handleFilteringOfSpans = (e) => {
    setFilterOfSpans(e.target.value)
  }

  const selectSpansBasedOnDropdown = () => {
    if (filterOfSpans === "HTTP Spans") {
      const httpSpans = listOfSortedSpans.filter(span => span["instrumentation_library"].includes("http"))
      setListOfFilteredSpans(httpSpans)
    } else if (filterOfSpans === "Non-HTTP Spans"){
      const nonHTTPSpans = listOfSortedSpans.filter(span => !span["instrumentation_library"].includes("http"))
      setListOfFilteredSpans(nonHTTPSpans)
    } else {
      setListOfFilteredSpans(listOfSortedSpans)
    }
  }

  return (
    <div>
      <Header />
      <Breadcrumb page={"singleTrace"}/>
      <main className="p-5" height="1000px">
        <IndividualTraceHeader traceId={traceId} handleFilteringOfSpans={handleFilteringOfSpans} />
        <div className="mt-5 flex h-full w-full items-center transition-all">
          <div className={`duration-1000 ${showSpanInfo ? "w-1/2" : "w-full"} mr-4`}>
            <WaterfallChart
                labels={labels}
                datasets={datasets}
                handleClickOnChart={handleClickOnChart}
                className="w-1/2"
            />
          </div>
          <div className={`duration-1000 ease-in-out ${showSpanInfo ? "w-1/2" : "w-0 opacity-0"}`}>
            <SpanTables span={clickedSpan} closeEvent={setShowSpanInfo}/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default oneTrace;
