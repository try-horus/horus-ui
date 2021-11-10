function TraceTableRow({ data }) {
  return (
    <tr>
      <td className="text-center py-2 px-5">{data.method}</td>
      <td className="text-center py-2 px-5">{data.host}</td>
      <td className="text-center py-2 px-5">{data.endpoint}</td>
      <td className="text-center py-2 px-5">{data.latency}</td>
      <td className="text-center py-2 px-5">{ !!data.errors ? "Yes" : "No" }</td>
    </tr>
  )
}

export default TraceTableRow;