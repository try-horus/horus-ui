import { useEffect, useState } from "react"

import DataTable from 'react-data-table-component';


const SpanAttributesTable = ({ attributes }) => {
  const [attributesArray, setAttributesArray] = useState([])

  useEffect(() => {
    if (attributes !== undefined) {
      setAttributesArray(attributes)
    }
  }, [attributes]);
  
  // const staticSpan = [
  //   {
  //     "key": "http.url",
  //     "value": {
  //       "stringValue": "http://localhost:3001/dashboard"
  //     }
  //   },
  //   {
  //     "key": "http.host",
  //     "value": {
  //       "stringValue": "localhost:3001"
  //     }
  //   },
  //   {
  //     "key": "net.host.name",
  //     "value": {
  //       "stringValue": "localhost"
  //     }
  //   },
  //   {
  //     "key": "http.method",
  //     "value": {
  //       "stringValue": "GET"
  //     }
  //   },
  //   {
  //     "key": "http.target",
  //     "value": {
  //       "stringValue": "/dashboard"
  //     }
  //   },
  //   {
  //     "key": "http.user_agent",
  //     "value": {
  //       "stringValue": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:94.0) Gecko/20100101 Firefox/94.0"
  //     }
  //   },
  //   {
  //     "key": "http.flavor",
  //     "value": {
  //       "stringValue": "1.1"
  //     }
  //   },
  //   {
  //     "key": "net.transport",
  //     "value": {
  //       "stringValue": "ip_tcp"
  //     }
  //   },
  //   {
  //     "key": "net.host.ip",
  //     "value": {
  //       "stringValue": "::ffff:127.0.0.1"
  //     }
  //   },
  //   {
  //     "key": "net.host.port",
  //     "value": {
  //       "intValue": 3001
  //     }
  //   },
  //   {
  //     "key": "net.peer.ip",
  //     "value": {
  //       "stringValue": "::ffff:127.0.0.1"
  //     }
  //   },
  //   {
  //     "key": "net.peer.port",
  //     "value": {
  //       "intValue": 33804
  //     }
  //   },
  //   {
  //     "key": "http.status_code",
  //     "value": {
  //       "intValue": 304
  //     }
  //   },
  //   {
  //     "key": "http.status_text",
  //     "value": {
  //       "stringValue": "NOT MODIFIED"
  //     }
  //   },
  //   {
  //     "key": "http.route",
  //     "value": {
  //       "stringValue": "/dashboard"
  //     }
  //   }
  // ]

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
    />
);
}

export default SpanAttributesTable