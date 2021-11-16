import ButtonToGoBack from "./ButtonToGoBack"
import ButtonToFilterTraces from "./ButtonToFilterTraces"

const IndividualTraceHeader = ({ traceId }) => {
  return (
    <div className="container items-center">
      <ButtonToGoBack />
      <ButtonToFilterTraces />
      <div className="bg-blue-800 p-3 text-white float-right">
        Trace id: {traceId}
      </div>
    </div>
  )
}

export default IndividualTraceHeader;