import DataTable from 'react-data-table-component';

// const columns = [
//     {
//       name: 'Title',
//       selector: row => row.title,
//     },
//     {
//       name: 'Year',
//       selector: row => row.year,
//     },
// ];

// const data = [
//     {
//       id: 1,
//       title: 'Beetlejuice',
//       year: '1988',
//     },
//     {
//       id: 2,
//       title: 'Ghostbusters',
//       year: '1984',
//     },
// ]

const SpanInfoTable = ({ span }) => {
    const staticSpan = {
      "span_id": "3227409ff7bba6b9",
      "span_name": "GET /dashboard",
      "trace_id": "9f510eb5b0fc73b04bc63ec862ba3133",
      "parent_span_id": null,
      "start_time": "2021-11-11T22:26:46.954Z",
      "end_time": "2021-11-11T22:26:46.964Z",
      "start_time_in_microseconds": "1636669606954385",
      "span_latency": 9684,
      "instrumentation_library": "@opentelemetry/instrumentation-http",
      // "span_attributes": [
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
      //],
      "status_code": 304
    }
    
    const keys = Object.keys(span)
    console.log(keys)

    const columns = [
      {
        name: 'Span Info',
        selector: row => row.title,
      },
      {
        name: "",
        selector: row => row.data
      }
    ]

    const data = [
      {
        id: 1,
        title: "Span Id",
        data: span["span_id"]
      },
      {
        id: 2,
        title: "Span Name",
        data: span["span_name"]
      },
      {
        id: 3,
        title: "Trace Id",
        data: span["trace_id"]
      },
      {
        id: 4,
        title: "Parent Span Id",
        data: span["parent_span_id"]
      },
      {
        id: 5,
        title: "Start Time of the Span",
        data: span["start_time"]
      },
      {
        id: 6,
        title: "End Time of the Span",
        data: span["end_time"]
      },
      {
        id: 7,
        title: "Span Latency in Microseconds",
        data: span["span_latency"]
      },
      {
        id: 8,
        title: "Instrumentation Library",
        data: span["instrumentation_library"]
      },
      {
        id: 9,
        title: "HTTP Status Code",
        data: span["status_code"]
      },
    ]

    /*
    const titles = [
      "Span Id",
      "Span Name",
      "Trace Id",
      "Parent Span Id",
      "Start Time",
      "End Time",
      "Span Latency in microseconds",
      "Instrumentation library",
      "HTTP Status Code"
    ]*/
    /*
    const data = keys.map((title, id) => {
      return {
        id,
        title: titles[id],
        data: span[title]
      }
    })*/
    
    console.log(columns)
    console.log(data)

    return (
        <DataTable
            columns={columns}
            data={data}
        />
    );
};

export default SpanInfoTable