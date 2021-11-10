import TraceTableRow from "../components/traceTableRow";
import Pagination from "../components/pagination";
import { useState } from "react";

// Only 10 because that's what SQL would return (assuming pagination limit of 10)
const testDataOne = [
  {
    trace_id: "xyz", // traceId
    method: "POST", // http.method
    host: "165.227.197.184:8001", // http.host
    endpoint: "/v1/metrics", // http.target
    latency: 1804,
    errors: true, // How define this? What if valid error? E.g. 404
  },
  {
    trace_id: "abc",
    method: "GET",
    host: "104.248.234.183:8000",
    endpoint: "/api/cart",
    latency: 170,
    errors: false,
  },
  {
    trace_id: "xyz1", // traceId
    method: "POST", // http.method
    host: "165.227.197.184:8001", // http.host
    endpoint: "/v1/metrics", // http.target
    latency: 1804,
    errors: false, // How define this? What if valid error? E.g. 404
  },
  {
    trace_id: "abc1",
    method: "GET",
    host: "104.248.234.183:8000",
    endpoint: "/api/cart",
    latency: 170,
    errors: false,
  },
  {
    trace_id: "xyz2", // traceId
    method: "POST", // http.method
    host: "165.227.197.184:8001", // http.host
    endpoint: "/v1/metrics", // http.target
    latency: 1804,
    errors: false, // How define this? What if valid error? E.g. 404
  },
  {
    trace_id: "abc2",
    method: "GET",
    host: "104.248.234.183:8000",
    endpoint: "/api/cart",
    latency: 170,
    errors: false,
  },
  {
    trace_id: "xyz3", // traceId
    method: "POST", // http.method
    host: "165.227.197.184:8001", // http.host
    endpoint: "/v1/metrics", // http.target
    latency: 1804,
    errors: true, // How define this? What if valid error? E.g. 404
  },
  {
    trace_id: "abc3",
    method: "GET",
    host: "104.248.234.183:8000",
    endpoint: "/api/cart",
    latency: 170,
    errors: false,
  },
  {
    trace_id: "xyz4", // traceId
    method: "POST", // http.method
    host: "165.227.197.184:8001", // http.host
    endpoint: "/v1/metrics", // http.target
    latency: 1804,
    errors: false, // How define this? What if valid error? E.g. 404
  },
  {
    trace_id: "abc4",
    method: "GET",
    host: "104.248.234.183:8000",
    endpoint: "/api/cart",
    latency: 170,
    errors: true,
  }
]

const testDataTwo = [
  {
    trace_id: "xyz5", // traceId
    method: "POST", // http.method
    host: "165.227.197.184:8001", // http.host
    endpoint: "/v1/metrics", // http.target
    latency: 1804,
    errors: false, // How define this? What if valid error? E.g. 404
  },
  {
    trace_id: "abc5",
    method: "GET",
    host: "104.248.234.183:8000",
    endpoint: "/api/cart",
    latency: 170,
    errors: false,
  }
]

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