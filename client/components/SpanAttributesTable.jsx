import { useEffect, useState } from "react"

import DataTable from 'react-data-table-component';


const SpanAttributesTable = ({ attributes, style }) => {
  const [attributesArray, setAttributesArray] = useState([])

  useEffect(() => {
    if (attributes !== undefined) {
      setAttributesArray(attributes)
    }
  }, [attributes]);

  const columns = [
    {
      name: 'Span Attributes',
      selector: row => row.title,
    },
    {
      name: "",
      selector: row => row.data
    }
  ]

  const data = attributesArray.map((obj, id) => {
    if (obj.key === "http.user_agent") {
      return {} 
    }
    return {
      id,
      title: obj["key"],
      data: obj["value"]["intValue"] || obj["value"]["stringValue"]
    }
  })

  return (
    <DataTable
        columns={columns}
        data={data}
        customStyles={style}
    />
);
}

export default SpanAttributesTable