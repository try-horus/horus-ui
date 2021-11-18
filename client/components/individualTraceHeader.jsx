import ButtonToGoBack from "./ButtonToGoBack"
import ButtonToFilterTraces from "./ButtonToFilterTraces"

const IndividualTraceHeader = ({ traceId, handleFilteringOfSpans }) => {
  

  return (
    <div className="container items-center">
      <ButtonToGoBack />
      {/* <ButtonToFilterTraces /> */}
      <div className="w-36 bg-transparent hover:bg-blue-800 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
      <form action="#">
          <label for="spansfilter">Spans to show: </label>
          <select name="spansfilter" id="spansfilter" onChange={handleFilteringOfSpans} >
            <option value="All Spans">All Spans</option>
            <option value="HTTP Spans">HTTP Spans</option>
            <option value="Non-HTTP Spans">Non-HTTP Spans</option>
          </select>
        </form>
      </div>
      <div className="bg-blue-800 p-3 text-white float-right">
        Trace id: {traceId}
      </div>
    </div>
  )
}

export default IndividualTraceHeader;