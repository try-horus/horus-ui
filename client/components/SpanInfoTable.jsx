import DataTable from 'react-data-table-component';


const SpanInfoTable = ({ span, style }) => {
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

    return (
        <DataTable
            columns={columns}
            data={data}
            customStyles={style}
        />
    );
};

export default SpanInfoTable