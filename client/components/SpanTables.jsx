import { useEffect, useState } from "react"
import SpanInfoTable from "./SpanInfoTable"
import SpanAttributesTable from "./SpanAttributesTable"


const SpanTables = ({ span, closeEvent }) => {
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
        minHeight: '72px', 
      }
    },
    headCells: {
      style: {
        fontSize: '20px',
        fontWeight: '500',
        textTransform: 'uppercase',
        paddingLeft: '0 8px',
        fontFamily: 'Rubik',
        color: '#081b53',
      },
    },
    cells: {
      style: {
        fontSize: '13px',
        paddingLeft: '0 20px',
        fontFamily: 'Roboto',
        color: '#081b53',
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
    <>
      <div className="pl-7 shadow-xl rounded-sm h-full w-full max-h-96 overflow-y-scroll">
        <SpanInfoTable span={spanWithoutAttributes} style={customStyles} />
        <SpanAttributesTable attributes={arrayOfSpanAttributes} style={customStyles}/>
      </div>
      <div className="grid place-items-center">
        <button 
          className="text-horusViolet shadow-lg bg-white rounded-full pr-3 pl-3 pb-1 mt-5 border-gray-300 items-center"
          onClick={() => closeEvent(false)}
          >x</button>
      </div>
    </>
  )
}

export default SpanTables

