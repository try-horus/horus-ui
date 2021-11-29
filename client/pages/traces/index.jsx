import TraceTable from "../../components/reactTable";
import Header from "../../components/pageHeader"
import Breadcrumb from "../../components/Breadcrumb"
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";

function AllTraces() {
  const [ traces, setTraces ] = useState([]);

  const router = useRouter();
  const start = router.query.start;
  const end = router.query.end;

  useEffect(() => {
    axios
      .get(`http://${window.location.hostname}:5001/traces?start=${start}&end=${end}`)
      .then(res => {
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

export default AllTraces;