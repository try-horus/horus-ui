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

  const customStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
      }
    },
    headCells: {
      style: {
        fontSize: '20px',
        fontWeight: '500',
        textTransform: 'uppercase',
        paddingLeft: '0 8px'
      },
    },
    cells: {
      style: {
        fontSize: '13px',
        paddingLeft: '0 20px',
      },
    },
    tableWrapper: {
      style:{
        borderRadius: "25px",
        width: "95%",
        backgroundColor: "white",
      } 
    }
  };

  return (
    <div className="pl-7 shadow-xl h-full w-full pr-4 max-h-96 overflow-y-scroll">
      <SpanInfoTable span={spanWithoutAttributes} style={customStyles} />
      <SpanAttributesTable attributes={arrayOfSpanAttributes} style={customStyles}/>
    </div>
  )
}

export default SpanTables

