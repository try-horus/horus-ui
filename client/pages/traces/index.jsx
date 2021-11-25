import TraceTable from "../../components/reactTable";
import Header from "../../components/pageHeader"
import Breadcrumb from "../../components/Breadcrumb"
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
      .get(`${process.env.UI_SERVER_HOST}/traces?start=${start}&end=${end}`)
      .then(res => {
        setCount(res.data.count || 0);
        setTraces(res.data.traces || []);
      });
  }, [start, end]);

  return (
    <div >
      <Header />
      <Breadcrumb />
      <TraceTable data={traces}/>
    </div>
  )
}

export default About;