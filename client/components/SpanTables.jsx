import { useEffect, useState } from "react"
import SpanInfoTable from "./SpanInfoTable"
import SpanAttributesTable from "./SpanAttributesTable"


const SpanTables = ({ span }) => {
  const [spanWithoutAttributes, setSpanWithoutAttributes] = useState([])
  const [arrayOfSpanAttributes, setArrayOfSpanAttributes] = useState([])

  useEffect(() => {
    if (span !== undefined) {
      let {span_attributes, ...tempSpanWithoutAttributes} = span
      setSpanWithoutAttributes(tempSpanWithoutAttributes)
      setArrayOfSpanAttributes(span_attributes)
    }
  }, [span]);

  return <div className="mt-5 flex h-full w-full">
  <div className="bg-green-200 p-1 w-1/2">
    <SpanInfoTable span={spanWithoutAttributes} />
  </div>
  <div className="bg-green-200 p-1 w-1/2">
    <SpanAttributesTable attributes={arrayOfSpanAttributes} />
  </div>
  </div>
}

export default SpanTables

