import TraceTableRow from "../components/traceTableRow";
import Pagination from "../components/pagination";
import { useState } from "react";


function About() {
  const [ currentLink, setCurrentLink ] = useState(1);
  const [ data, setData ] = useState(testDataOne);
  const dataStore = {
    1: testDataOne,
    2: testDataTwo
  }
  return (
    <div className="my-5">
      <table className="border-collapse border border-gray-500 mb-3 content-center ml-auto mr-auto">
        <thead>
          <tr>
            <th className="px-3 py-2 border-b border-gray-500">HTTP Method</th>
            <th className="px-3 py-2 border-b border-gray-500">Host</th>
            <th className="px-3 py-2 border-b border-gray-500">Endpoint</th>
            <th className="px-3 py-2 border-b border-gray-500">Latency (ms)</th>
            <th className="px-3 py-2 border-b border-gray-500">Errors in spans</th>
          </tr>
        </thead>
        <tbody>
          {data.map((trace) => <TraceTableRow data={trace} key={trace.trace_id}/>)}
        </tbody>
      </table>
        <Pagination length={12} currentLink={currentLink} setCurrentLink={setCurrentLink} setData={setData} data={dataStore} />
    </div>
  )
}

export default About;