import LineChart from "./charts/LineChart.jsx"

function About() {
  return (
   <table>
     <tr>
       <th>Trace name</th>
       <th>Endpoint</th>
       <th>Latency (ms)</th>
       <th>Errors in spans</th>
     </tr>
     <tr>
       <td>HTTP POST</td>
       <td>0.905</td>
       <td>Yes</td>
     </tr>
     <tr>
       <td>GET /api/cart</td>
       <td>18.195</td>
       <td>No</td>
     </tr>
   </table>
    )
}

export default About