import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// const columns = [
//     {
//         name: 'Http Method',
//         selector: row => row.root_span_http_method,
//     },
//     {
//         name: 'Host',
//         selector: row => row.root_span_host,
//     },
//     {
//       name: 'Endpoint',
//       selector: row => row.root_span_endpoint,
//     },
//     {
//       name: 'Latency',
//       selector: row => row.trace_latency,
//     },
// ];

const columns = [
  {
    name: 'Trace Id',
    selector: row => row.trace_id,
    sortable: true,
  },
  {
      name: 'Http Method',
      selector: row => row.method,
      sortable: true,
  },
  {
      name: 'Host',
      selector: row => row.host,
      sortable: true,
  },
  {
    name: 'Endpoint',
    selector: row => row.endpoint,
    sortable: true,
  },
  {
    name: 'Latency',
    selector: row => row.latency,
    sortable: true,
  },
  {
    name: 'Errors',
    selector: row => row.errors,
    sortable: true,
  },
];

const testDataOne = [
  {
    trace_id: "xyz", // traceId
    method: "POST", // http.method
    host: "165.227.197.184:8001", // http.host
    endpoint: "/v1/metrics", // http.target
    latency: 1804,
    errors: "true", // How define this? What if valid error? E.g. 404
  },
  {
    trace_id: "abc",
    method: "GET",
    host: "104.248.234.183:8000",
    endpoint: "/api/cart",
    latency: 170,
    errors: "false",
  },
  {
    trace_id: "xyz1", // traceId
    method: "POST", // http.method
    host: "165.227.197.184:8001", // http.host
    endpoint: "/v1/metrics", // http.target
    latency: 1804,
    errors: "false", // How define this? What if valid error? E.g. 404
  },
  {
    trace_id: "abc1",
    method: "GET",
    host: "104.248.234.183:8000",
    endpoint: "/api/cart",
    latency: 170,
    errors: "false",
  },
  {
    trace_id: "xyz2", // traceId
    method: "POST", // http.method
    host: "165.227.197.184:8001", // http.host
    endpoint: "/v1/metrics", // http.target
    latency: 1804,
    errors: "false", // How define this? What if valid error? E.g. 404
  },
  {
    trace_id: "abc2",
    method: "GET",
    host: "104.248.234.183:8000",
    endpoint: "/api/cart",
    latency: 170,
    errors: "false",
  },
  {
    trace_id: "xyz3", // traceId
    method: "POST", // http.method
    host: "165.227.197.184:8001", // http.host
    endpoint: "/v1/metrics", // http.target
    latency: 1804,
    errors: "true", // How define this? What if valid error? E.g. 404
  },
  {
    trace_id: "abc3",
    method: "GET",
    host: "104.248.234.183:8000",
    endpoint: "/api/cart",
    latency: 170,
    errors: "false",
  },
  {
    trace_id: "xyz4", // traceId
    method: "POST", // http.method
    host: "165.227.197.184:8001", // http.host
    endpoint: "/v1/metrics", // http.target
    latency: 1804,
    errors: "false", // How define this? What if valid error? E.g. 404
  },
  {
    trace_id: "abc4",
    method: "GET",
    host: "104.248.234.183:8000",
    endpoint: "/api/cart",
    latency: 170,
    errors: "true",
  },
  {
    trace_id: "abc4",
    method: "GET",
    host: "104.248.234.183:8000",
    endpoint: "/api/cart",
    latency: 170,
    errors: "true",
  }
]

const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;
	&:hover {
		cursor: pointer;
	}
`;


const ClearButton = styled.button`
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	height: 34px;
	width: 32px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;


const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<>
		<TextField
			id="search"
			type="text"
			placeholder="Filter By Name"
			aria-label="Search Input"
			value={filterText}
			onChange={onFilter}
		/>

		<ClearButton type="button" onClick={onClear}>
			X
		</ClearButton>
	</>
);

  export const Filtering = () => {
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = testDataOne.filter( 
      item => {
        let searchTerm = filterText.toLowerCase()
          return (item.trace_id.toLowerCase().includes(searchTerm) || 
            item.host.toLowerCase().includes(searchTerm) ||
            item.method.toLowerCase().includes(searchTerm) ||
            item.endpoint.toLowerCase().includes(searchTerm) ||
            item.errors.toLowerCase().includes(searchTerm)) 
      }
    );
  
    const handleClear = () => {
        if (filterText) {
          setResetPaginationToggle(!resetPaginationToggle);
          setFilterText('');
        }
    };

    const returnFilteredComponent = () => {
      return (
        <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText}/>
      )
    }

    return (
      <>
        <DataTable
            title="Traces"
            columns={columns}
            data={filteredItems}
            pagination
            subHeader
            subHeaderComponent={returnFilteredComponent()}
            dense
        />
      </>
    );
};

export default Filtering