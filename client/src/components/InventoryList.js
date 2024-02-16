import React, { useState, useEffect, useRef, useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { AgGridReact } from "ag-grid-react";
import { Link } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getDevices, getQRDevices } from "../utils/queries";
import { massSetQRDevices, massSetMarkSurplus } from "../utils/mutations";
import { dateFormat } from "../utils/helperFunctions";
import "../styles/inventoryList.css"

const InventoryList = () => {
  const { loading, error, data } = useQuery(getDevices);
  const [selectedDeviceIds, setSelectedDeviceIds] = useState([]);
  const [setQRDevicesMutation] = useMutation(massSetQRDevices)
  const [setMassMarkMutation] = useMutation(massSetMarkSurplus)
  const [selectedMassUpdate, setMassUpdate] = useState("addPrintLabels");
  const gridRef = useRef(null);

  // Wrap the initialization of 'records' in its own useMemo() hook to avoid dependency issue
  const records = useMemo(() => data?.getDevices || [], [data]);

  useEffect(() => {
    if (gridRef.current && gridRef.current.gridOptions && records.length > 0) {
      gridRef.current.gridOptions.api.setRowData(records);
      gridRef.current.gridOptions.api.sizeColumnsToFit();
    }
  }, [records, loading]);

  useEffect(() => {
    if (selectedDeviceIds.length > 0) {
      
    }
  }, [selectedDeviceIds]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const columnDefs =[ 
    {
      headerCheckboxSelection: true, // Add checkbox in header
      checkboxSelection: true, // Add checkbox in each row
      field: "_id", // Use _id as field for checkbox
      headerName: "",
      width: 50,
    },  
    ...Object.keys(records[0] || {})
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
            if ((key === "PurchaseDate") && params.data[key]) {
              return dateFormat(params.data.PurchaseDate)
            }else if ((key === "Warranty") && params.data[key]) {
              return dateFormat(params.data.Warranty)
            }else if (index === 0 && params.data) {
              return (
                <Link to={`/device/${params.data._id}`} key={params.data._id}>
                  {params.data[key]}
                </Link>
              );
            }
            return params.data[key];
          },
        };
    }),
  ];
  
  const gridOptions = {
    suppressColumnVirtualisation: true,
    suppressMenuHide: true,
    onFirstDataRendered: (params) => {
      params.api.sizeColumnsToFit();
    },
    pagination: true,
    paginationPageSize:20,
    domLayout: "autoHeight",
  };

  const handleSelectionChanged = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedIds = selectedNodes.map((node) => node.data._id);
    setSelectedDeviceIds(selectedIds);
    console.log(selectedDeviceIds)
  };

  const handleMassUpdate = async ()=>{
    console.log(selectedDeviceIds)
    if (selectedMassUpdate==="addPrintLabels"){
          const returnedData = await setQRDevicesMutation({
                            variables: { data: {data:selectedDeviceIds} },
                            refetchQueries: [{ query: getDevices }, {query:getQRDevices}],
                          })
          alert("Devices have been added to labels!")
          return returnedData                 
    }

    if (selectedMassUpdate==="addSurplus"){
      const returnedData = await setMassMarkMutation({
                        variables: { data: {data:selectedDeviceIds} },
                        refetchQueries: [{ query: getDevices }, {query:getQRDevices}],
                      })
      alert("Devices have been added to labels!")
      return returnedData 
    }    
  }

  return (
    <div
      className="ag-theme-alpine"
      style={{ width: "100%", height: "400px" }}
      data-testid="grid-container"
    >
      <div className="agContainer">
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={records}
        gridOptions={gridOptions}
        rowSelection="multiple"
        onSelectionChanged={handleSelectionChanged}
      />
      </div>
      <div className="massUpdateContainer">
        <p className="massUpdateP">Update Selected Items</p>
        <select
          onChange={(e) => setMassUpdate(e.target.value)}
          className="massUpdateSelect"
          value={selectedMassUpdate}
        >
          <option value="addPrintLabels">Add to Print Labels</option>
          <option value="addSurplus">Mass Surplus</option>
        </select>
        <button className="massUpdateButton" onClick={()=>handleMassUpdate()}>
          Update
        </button>
      </div>
    </div>
  );
};

export default InventoryList;
