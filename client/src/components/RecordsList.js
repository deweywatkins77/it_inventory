import React, { useEffect, useRef, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getDevices } from "../utils/queries";

const RecordsList = () => {
  const { loading, error, data } = useQuery(getDevices);
  const gridRef = useRef(null);

  // Wrap the initialization of 'records' in its own useMemo() hook to avoid dependency issue
  const records = useMemo(() => data?.getDevices || [], [data]);

  useEffect(() => {
    if (gridRef.current && gridRef.current.gridOptions) {
      gridRef.current.gridOptions.api.setRowData(records);
      gridRef.current.gridOptions.api.sizeColumnsToFit();
    }
  }, [records]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const columnDefs = Object.keys(records[0] || {})
    .filter((key) => key !== "__typename" && key !== "os")
    .map((key) => ({
      headerName: key.toUpperCase(),
      field: key,
      sortable: true,
      filter: true,
      autoHeight: true,
      suppressAutoSize: false,
      minWidth: 135,
      resizable: true, // Make columns resizable
    }));

  const gridOptions = {
    suppressColumnVirtualisation: true,
    onFirstDataRendered: (params) => {
      params.api.sizeColumnsToFit();
    },
    domLayout: "autoHeight", // Use autoHeight for automatic resizing
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

export default RecordsList;
