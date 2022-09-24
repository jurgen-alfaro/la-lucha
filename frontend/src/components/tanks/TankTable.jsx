import { useContext, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import TanksContext from "../../context/tanks/TanksContext";
import "moment/locale/es";
import { useTable, usePagination, useSortBy } from "react-table";
const formatter = new Intl.NumberFormat("es-CR", {
  style: "currency",
  currency: "CRC",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
function TankTable() {
  const { tanks } = useContext(TanksContext);
  const data = useMemo(() => tanks, [tanks]);

  const columns = useMemo(
    () => [
      { Header: "", accessor: "idtanks" },
      { Header: "Nombre", accessor: "name" },
      {
        Header: "Ubicación",
        accessor: "location",
        Cell: ({ value }) => {
          return <div style={{ whiteSpace: "pre-wrap" }}>{value}</div>;
        },
      },
      {
        Header: "Capacidad (m³)",
        accessor: "capacity",
        Cell: ({ value }) => {
          return `${value} m³`;
        },
      },
      {
        Header: "Costo",
        accessor: "costo",
        Cell: ({ value }) => {
          return formatter.format(value);
        },
      },
      { Header: "Proveedor", accessor: "proveedor" },
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useSortBy, usePagination);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
  } = tableInstance;
  const { pageIndex } = state;

  return (
    <>
      <table className='table table-compact w-full' {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps} key={index}>
              {headerGroup.headers.map((column, index) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={index}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4 inline'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                            clipRule='evenodd'
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4 inline'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z'
                            clipRule='evenodd'
                          />
                        </svg>
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
              <th></th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps} className='hover' key={index}>
                {row.cells.map((cell, index) => {
                  return (
                    <td {...cell.getCellProps()} key={index}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
                <td>
                  <>
                    <Link
                      to={`${row.original.idtanks}`}
                      htmlFor='my-modal-4'
                      className='btn btn-sm modal-button btn-outline btn-warning '
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z' />
                        <path
                          fillRule='evenodd'
                          d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </Link>
                  </>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='divider'></div>
      <span className='text-sm'>
        Página <strong>{pageIndex + 1}</strong> de{" "}
        <strong>{pageOptions.length}</strong>
      </span>
      <div className='pagination-btns'>
        <button
          className='btn btn-primary btn-sm mr-2'
          disabled={!canPreviousPage}
          onClick={() => previousPage()}
        >
          &nbsp;
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
              clipRule='evenodd'
            />
          </svg>
          Anterior
        </button>
        <button
          className='btn btn-primary btn-sm'
          disabled={!canNextPage}
          onClick={() => nextPage()}
        >
          Siguiente{" "}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default TankTable;
