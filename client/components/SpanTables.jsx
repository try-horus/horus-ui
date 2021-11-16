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
    title: {
      style: {
        fontColor: 'red',
        fontWeight: '900',
      }
    },
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
        border: "2px solid rgb(30, 64, 175)",
        margin: "20px",
        padding: "20px",
        width: "95%",
        backgroundColor: "white",
      } 
    }
  };

  return <div className="mt-5 bg-blue-800 flex h-full w-full pr-4">
  <div className="p-1 w-1/2">
    <SpanInfoTable span={spanWithoutAttributes} style={customStyles} />
  </div>
  <div className="p-1 w-1/2">
    <SpanAttributesTable attributes={arrayOfSpanAttributes} style={customStyles}/>
  </div>
  </div>
}

export default SpanTables

