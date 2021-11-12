function TraceTableRow({ data }) {
  return (
    <tr>
      <td className="text-center py-2 px-5">{data.root_span_http_method}</td>
      <td className="text-center py-2 px-5">{data.root_span_host}</td>
      <td className="text-center py-2 px-5">{data.root_span_endpoint}</td>
      <td className="text-center py-2 px-5">{data.trace_latency}</td>
      <td className="text-center py-2 px-5">{ !!data.errors ? "Yes" : "No" }</td>
    </tr>
  )
}

export default TraceTableRow;