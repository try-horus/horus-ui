import DataTable from 'react-data-table-component';
import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router'

const columns = [
    {
        name: 'Trace Id',
        selector: row => row.trace_id,
        sortable: true,
  },
    {
        name: 'Http Method',
        selector: row => row.root_span_http_method,
        sortable: true
    },
    {
        name: 'Host',
        selector: row => row.root_span_host,
        sortable: true,
    },
    {
      name: 'Endpoint',
      selector: row => row.root_span_endpoint,
      sortable: true,
    },
    {
      name: 'Latency (μs)',
      selector: row => row.trace_latency,
      sortable:true
    },
    {
      name: 'Errors',
      selector: row => String(row.contains_errors),
      sortable:true
    },
];

const customStyles = {
  rows: {
    style: {
      minHeight: '72px', // override the row height
      "&:hover": {
        cursor: "pointer",
      }
    }
  },
  headCells: {
    style: {
      fontSize: '20px',
      fontWeight: '500',
      fontFamily: "Rubik",
      color: '#081b53'
    },
  },
  cells: {
    style: {
      fontSize: '13px',
      fontFamily: 'Roboto',
      paddingTop: '15px',
      paddingBottom: '15px',
      color: '#081b53'
    },
  },
  tableWrapper: {
    style:{
      borderRadius: "25px",
      margin: "20px",
      padding: "20px",
      width: "95%"
    } 
  }
};


const FilterComponent = ({ filterText, onFilter}) => (
	<>
    <input			
      id="search"
			type="text"
			placeholder="Filter By Trace Details"
      aria-label="Search Input"
			value={filterText}
			onChange={onFilter}
      className="flex divide-x divide-gray-200 rounded-md shadow-lg p-3 mr-2"
    ></input>
	</>
);

  export const Filtering = ({data}) => {
    const router = useRouter()
    const [filterText, setFilterText] = useState('');
    const filteredItems = data.filter(
      item => {
        let searchTerm = filterText.toLowerCase()
          return (
            item.trace_id.toLowerCase().includes(searchTerm) ||
            String(item.root_span_host).includes(searchTerm) ||
            item.root_span_http_method.toLowerCase().includes(searchTerm) ||
            item.root_span_endpoint.toLowerCase().includes(searchTerm)  ||
            String(item.trace_latency).includes(searchTerm) ||
            String(item.contains_errors).includes(searchTerm))
      }
    );
    
    function onFilter(e) {
      setFilterText(e.target.value)
    }

    const TableHeader = () => {
      return (
          <div className="flex items-center ml-16 mr-16 pt-16">
            <h2 className="font-head text-horusBlue text-center text-7xl">Traces</h2>
            <span className="w-full"></span>
            <FilterComponent onFilter={onFilter} filterText={filterText} />
          </div>
      )
    }

    const handleRowClick = (e) => {
      const traceId = e.trace_id
      const href = `${process.env.UI_CLIENT_HOST}/traces/${traceId}`
      router.push(href)
    }

    return (
      <>
        {TableHeader()}
        <div className="ml-5 mr-5">
        <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            dense
            onRowClicked={handleRowClick}
            className="rounded-lg"
            customStyles={customStyles}
            striped={true}
        />
        </div>
      </>
    );
};

export default Filtering