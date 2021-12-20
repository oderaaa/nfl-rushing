import { useContext, useMemo } from "react";
import { useTable } from "react-table";
import ErrorDisplay from "../errorDisplay/ErrorDisplay.js";
import Loading from "../loading/Loading.js";
import { ListContext } from '../../contexts/listContext';
import { CSVLink } from "react-csv";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useToggle, useFilter, useSelectDropDown } from '../../hooks/inputHooks';
import { useGoToNextPage, useGoToPrevPage } from '../../hooks/tableHooks';

import './tableStyle.css'

export const Table = ({ col }) => {
  const [list, setList] = useContext(ListContext);   
  const data = list.response.results; 
  const columns = useMemo(() => col, []);
  const {toggleValue, setToggleValue} = useToggle();
  const  goToNextPage  = useGoToNextPage();
  const goToPrevPage = useGoToPrevPage();
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable({ columns, data});   
  const rowData = rows.map(element => element.original);
  const nameFilter = useFilter();
  const { setPageLimitValue } = useSelectDropDown();

  
  return (
    <>
    {/*loading && <Loading/>}
    {error && <ErrorDisplay />*/}
    <div className="topBar">
      {<input placeholder="Search name" onChange={(e) => nameFilter(e.target.value)} />}
      <select name="pageLimit" id="pageLimit" defaultValue={20} onChange={(e)=>setPageLimitValue(e.target.value)}>
        <option value="25">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      {<ToggleButtonGroup
        color="primary"
        value={toggleValue}
        exclusive
        onChange={(e, value)=>setToggleValue(value)}
        aria-label="text alignment"
      >
      <ToggleButton value="Lng">Sort by Lng</ToggleButton>
      <ToggleButton value="Yds">Sort by Yds</ToggleButton>
      <ToggleButton value="TD">Sort by TD</ToggleButton>
      </ToggleButtonGroup>}
    </div>
    <table {...getTableProps()}>
      <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")} </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table> 
      <div>        
        <button onClick={goToPrevPage}>Previous </button>
        <CSVLink data={rowData}>Export as CSV</CSVLink>      
        <button onClick={goToNextPage}> Next </button>
      </div>
    </>
  );
}