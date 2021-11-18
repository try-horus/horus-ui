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
      name: 'Latency',
      selector: row => row.trace_latency,
      sortable:true
    },
    {
      name: 'Errors',
      selector: row => String(row.contains_errors),
      sortable:true
    },
];

const TextField = styled.input`
	height: 32px;
	width: 210px;
  margin: 1.25rem;
	border-radius: 5px;
	border: 2px solid #e5e5e5;
	padding: 0 32px 0 16px;
	&:hover {
		cursor: pointer;
	}
`;

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
      "&:hover": {
        cursor: "pointer",
      }
    }
  },
  headCells: {
    style: {
      fontSize: '15px',
      fontWeight: '500',
      textTransform: 'uppercase',
      paddingLeft: '0 8px'
    },
  },
  cells: {
    style: {
      fontSize: '13px',
      paddingLeft: '0 8px',
    },
  },
  tableWrapper: {
    style:{
      borderRadius: "25px",
      border: "2px solid rgb(30, 64, 175)",
      margin: "20px",
      padding: "20px",
      width: "95%"
    } 
  }
};


const FilterComponent = ({ filterText, onFilter}) => (
	<>
		<TextField
			id="search"
			type="text"
			placeholder="Filter By Trace Details"
			aria-label="Search Input"
			value={filterText}
			onChange={onFilter}
		/>
	</>
);

  export const Filtering = ({data}) => {
    const router = useRouter()

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
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
  
    const handleClear = () => {
        if (filterText) {
          setResetPaginationToggle(!resetPaginationToggle);
          setFilterText('');
        }
    };

    const returnFilteredComponent = () => {
      return (
        <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
      )
    }

    const handleRowClick = (e) => {
      const traceId = e.trace_id
      const href = `http://${process.env.UI_CLIENT_HOST}:3000/traces/${traceId}`
      router.push(href)
    }

    return (
      <>
        <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            subHeader
            subHeaderComponent={returnFilteredComponent()}
            dense
            onRowClicked={handleRowClick}
            className="rounded-lg"
            customStyles={customStyles}
        />
      </>
    );
};

export default Filtering