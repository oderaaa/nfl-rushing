import { useContext, useMemo } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { ListContext } from '../../contexts/listContext';
import { ColumnFilter } from "./ColumnFilter";
import { CSVLink } from "react-csv";
import './tableStyle.css'

export const PaginatedTable = ({ col }) => {
  const [list] = useContext(ListContext);  
  const data = useMemo(() => list, []);  
  const columns = useMemo(() => col, []);
  const defaultColumn = useMemo(() => ({ Filter: ColumnFilter }), []);

  const { 
    getTableProps, getTableBodyProps, headerGroups, page,
    nextPage, previousPage, canNextPage, canPreviousPage,
    pageOptions, state, gotoPage, pageCount, prepareRow,
    setPageSize, rows } = useTable({ columns, data, defaultColumn }, useFilters, useSortBy, usePagination);
    
  const { pageIndex, pageSize } = state;
  const rowData = rows.map(element => element.original);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps)}>{column.render("Header")}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                  <span>{column.isSorted ? (column.isSortedDesc ? String.fromCharCode('0x25BC') :  String.fromCharCode('0x25B2') ): ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
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
        <span>Page{' '}<strong>{pageIndex + 1} of {pageOptions.length}</strong> {' '} </span>
        <span>| Go to page: {' '} <input type='number' defaultValue={pageIndex + 1} onChange={e => {
          const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
          gotoPage(pageNumber)
        }} /> </span>
        <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
          {
            [10, 25, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                No of rows {pageSize}
              </option>

            ))

          }  </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}> {'<<'} </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}> {'>>'} </button>
        <CSVLink data={rowData}>Export as CSV</CSVLink>
      
        
      </div>
    </>
  );
}