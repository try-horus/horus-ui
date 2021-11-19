import TraceTable from "../../components/reactTable";
import Header from "../../components/pageHeader"
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

  useEffect(() => {
    axios
      .get(`http://143.198.27.65:5001/traces?start=${start}&end=${end}`)
      .then(res => {
        setCount(res.data.count || 0);
        setTraces(res.data.traces || []);
      });
  }, [start, end]);

  return (
    <div >
      <Header />
      <h2 className="text-center text-4xl mt-8">Traces</h2>
      <TraceTable data={traces}/>
    </div>
  )
}

// export async function getStaticProps({ query }) {
//   // Access query strings to make the URL dynamic

//   const res = await fetch("http://143.198.27.65:5001/traces?start=2021-11-10T22:07:58.000Z&end=2021-11-11T22:08:08.000Z");
//   const data = await res.json();
//   console.log(data)
//   return {
//     props: {
//       data,
//     },
//   }
// };

export default About;