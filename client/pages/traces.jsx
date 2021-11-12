import TraceTableRow from "../components/traceTableRow";
import MyComponent from "../components/reactTable";
import Pagination from "../components/pagination";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";

function About() {
  const [ currentLink, setCurrentLink ] = useState(1);
  const [ traces, setTraces ] = useState([]);
  const [ count, setCount ] = useState(0);
  const router = useRouter();
  const start = router.query.start;
  const end = router.query.end;

  // useEffect(() => {
  //   console.log(start, end)
  //   axios
  //     .get(`http://localhost:5001/traces?start=${start}&end=${end}`)
  //     .then(res => {
  //       setCount(res.data.count || 0);
  //       setTraces(res.data.traces || []);
  //     });
  // }, [start, end]);

  return (
    <div className="my-5">
      <MyComponent />
      {/* <p>The query returned {count} traces</p>
      <table className="border-collapse border border-gray-500 mb-3 content-center ml-auto mr-auto">
        <thead>
          <tr>
            <th className="px-3 py-2 border-b border-gray-500">HTTP Method</th>
            <th className="px-3 py-2 border-b border-gray-500">Host</th>
            <th className="px-3 py-2 border-b border-gray-500">Endpoint</th>
            <th className="px-3 py-2 border-b border-gray-500">Latency (microseconds)</th>
            <th className="px-3 py-2 border-b border-gray-500">Errors in spans</th>
          </tr>
        </thead>
        <tbody>
          //{traces.map((trace) => <TraceTableRow data={trace} key={trace.trace_id}/>)}
        </tbody>
      </table>
        <Pagination length={12} currentLink={currentLink} setCurrentLink={setCurrentLink} setTraces={setTraces} traces={traces} /> */}
    </div>
  )
}

// export async function getStaticProps({ query }) {
//   // Access query strings to make the URL dynamic

//   const res = await fetch("http://localhost:5001/traces?start=2021-11-10T22:07:58.000Z&end=2021-11-11T22:08:08.000Z");
//   const data = await res.json();
//   console.log(data)
//   return {
//     props: {
//       data,
//     },
//   }
// };

export default About;