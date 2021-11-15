import DataTable from 'react-data-table-component';
import { useState } from 'react';
import styled from 'styled-components';

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

  export const Filtering = ({data}) => {
    console.log(data)
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
            String(item.trace_latency).includes(searchTerm)) ||
            String(item.contains_errors).includes(searchTerm)
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