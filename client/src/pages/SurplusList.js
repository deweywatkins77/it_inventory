import React, { useEffect, useRef, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { AgGridReact } from "ag-grid-react";
import { Link } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getSurplus } from "../utils/queries";

const InventoryList = () => {
  const { loading, error, data } = useQuery(getSurplus);
  const gridRef = useRef(null);

  // Wrap the initialization of 'records' in its own useMemo() hook to avoid dependency issue
  const records = useMemo(() => data?.getSurplus || [], [data]);

  useEffect(() => {
    if (gridRef.current && gridRef.current.gridOptions && records.length > 0) {
      gridRef.current.gridOptions.api.setRowData(records);
      gridRef.current.gridOptions.api.sizeColumnsToFit();
    }
  }, [records, loading]);  // Include 'loading' in the dependency array

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const columnDefs = Object.keys(records[0] || {})
    .filter((key) => key !== "__typename" && key !== "OS" && key !== "_id")
    .map((key, index) => {
      return {
        headerName: key.toUpperCase(),
        field: key,
        sortable: true,
        filter: true,
        autoHeight: true,
        suppressAutoSize: false,
        minWidth: 135,
        resizable: true,
        cellRenderer: (params) => {
          if (index === 0 && params.data) {
            return (
              <Link to={`/device/${params.data._id}`} key={params.data._id}>
                {params.data[key]}
              </Link>
            );
          }
          return params.data[key];
        },
      };
    });

  const gridOptions = {
    suppressColumnVirtualisation: true,
    onFirstDataRendered: (params) => {
      params.api.sizeColumnsToFit();
    },
    pagination: true,
    paginationPageSize:20,
    domLayout: "autoHeight",
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{ width: "100%", height: "400px" }}
      data-testid="grid-container"
    >
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={records}
        gridOptions={gridOptions}
      />
    </div>
  );
};

export default InventoryList;
