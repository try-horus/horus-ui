
const IndividualTraceHeader = ({ traceId, handleFilteringOfSpans }) => {
  return (
    <>
    <div className="pl-10 mb-10 flex items-center">
      <h1 className="pt-10 text-left font-head text-horusBlue text-7xl">Single Trace</h1>
      <span className="flex-grow"></span>
      <form action="#" className="float-right font-body flex divide-x divide-gray-200 rounded-md shadow-lg p-4 mr-4">
          <select className="bg-white text-gray-500" name="spansfilter" id="spansfilter" onChange={handleFilteringOfSpans} >
            <option value="HTTP Spans">HTTP Spans</option>
            <option value="Non-HTTP Spans">Non-HTTP Spans</option>
            <option value="All Spans">All Spans</option>
          </select>
        </form>
    </div>
    <h3 className="pt-5 pl-10 text-2xl text-horusBlue">
          <b>Trace ID:</b> {traceId}
    </h3>
    </>
  )
}

export default IndividualTraceHeader;