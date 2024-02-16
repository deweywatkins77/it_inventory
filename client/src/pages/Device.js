import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { getDevices, getQRDevices, getSurplus } from "../utils/queries";
import { updateDevice, markSurplusDevice, setQRDevice } from '../utils/mutations';
import { deviceTypeList, statusDropDown } from '../utils/htmlInputs';
import "../styles/deviceForm.css"

const Device = () => {
    const { deviceId } = useParams();
    const { loading, error, data } = useQuery(getDevices, { variables: { id: deviceId } });
    const [updateDeviceMutation] = useMutation(updateDevice)
    const [markSurplusMutation] = useMutation(markSurplusDevice)
    const [setQRDeviceMutation] = useMutation(setQRDevice)
    const [inputValues, setInputValues] = useState({});

    useEffect(() => {
        if (data && data.getDevices && data.getDevices.length > 0) {
            setInputValues(data.getDevices[0]);
        }
    }, [data]);

    const handleInputChange = (key, value) => {
        setInputValues(prevValues => ({
            ...prevValues,
            [key]: value,
        }));
    };

    const handleUpdatedDeviceClick = async () => {
        try {
            const { _id, __typename, ...newDeviceData } = inputValues;
    
            if (!_id) {
                console.error('Device ID is missing.');
                return;
            }
    
            if (Object.keys(newDeviceData).length === 0) {
                console.error('No update data provided.');
                return;
            }
            const { data: { updateDevice } } = await updateDeviceMutation({
                variables: { id: _id, data: newDeviceData },
                refetchQueries: [{ query: getDevices }],
            });
            alert(`Device ${updateDevice._id} has been updated!`)
        } catch (err) {
            console.error('Error updating device:', err.message);
        }
    };

    const handleMarkSurplusClick = async ()=>{
        try{
           const {data: {markSurplusDevice:{_id:returnedID}}}= await markSurplusMutation({
            variables: {id:deviceId},
            refetchQueries: [{ query: getDevices }, { query: getSurplus }],
           })
           alert(`Device ${returnedID} marked for surplus!`)
        }catch(err){
            console.error("Error surplusing device:", err.message)
        }
    }
    
    const handleQRClick = async ()=>{
        try{
           const {data: {setQRDevice:{_id:returnedID}}}= await setQRDeviceMutation({
            variables: {id:deviceId},
            refetchQueries: [{ query: getDevices }, { query: getSurplus },{query:getQRDevices }],
           })
           alert(`Device ${returnedID} added to label!`)
        }catch(err){
            console.error("Error addind device to label:", err.message)
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <h1 style={{color: "red"}}>{error.message}!</h1>;

    return (
        
        <form className="deviceForm">
            <React.Fragment>
                <label className='requiredeLabel'>Serial Number: <span className='requiredAst'>*</span>
                    <br/>
                    <input
                        className={`SerialInput`}
                        type="text"
                        value={inputValues.Serial || ""}
                        id={`SerialInput`}
                        onChange={(e) => handleInputChange("Serial", e.target.value)}
                        required
                    />
                </label>
                <label>GT Inventory:
                    <br/>
                    <input
                        className={`GTInventoryInput`}
                        type="text"
                        value={inputValues.GTInventory || ""}
                        id={`GTInventoryInput`}
                        onChange={(e) => handleInputChange("GTInventory", e.target.value)}
                    />
                </label>
                <label>Device Type:
                    <br/>
                    <select
                        className={`dropDown`}
                        id={`DeviceTypeInput`}
                        onChange={(e) => handleInputChange("DeviceType", e.target.value)}
                        value={inputValues.DeviceType || ""}
                    >
                        {deviceTypeList.map((device)=>{
                            return (
                                <option
                                    key={"InventoryStatus"+device}
                                    value={device}
                                >
                                    {device}
                                </option>
                            )
                        })}
                    </select>
                </label>
                <label className='requiredeLabel'>Model: <span className='requiredAst'>*</span>
                    <br/>
                    <input
                        className={`ModelInput`}
                        type="text"
                        value={inputValues.Model || ""}
                        id={`ModelInput`}
                        onChange={(e) => handleInputChange("Model", e.target.value)}
                        required
                    />
                </label>
                <label className='requiredeLabel'>Manufacturer: <span className='requiredAst'>*</span>
                    <br/>
                    <input
                        className={`ManufacturerInput`}
                        type="text"
                        value={inputValues.Manufacturer || ""}
                        id={`ManufacturerInput`}
                        onChange={(e) => handleInputChange("Manufacturer", e.target.value)}
                        required
                    />
                </label>
                <label>OS:
                    <br/>
                    <input
                        className={`OSInput`}
                        type="text"
                        value={inputValues.OS || ""}
                        id={`OSInput`}
                        onChange={(e) => handleInputChange("OS", e.target.value)}
                    />
                </label>
                <label>Host Name:
                    <br/>
                    <input
                        className={`HostnameInput`}
                        type="text"
                        value={inputValues.Hostname || ""}
                        id={`HostnameInput`}
                        onChange={(e) => handleInputChange("Hostname", e.target.value)}
                    />
                </label>
                <label>IP:
                    <br/>
                    <input
                        className={`IPInput`}
                        type="text"
                        value={inputValues.IP || ""}
                        id={`IPInput`}
                        onChange={(e) => handleInputChange("IP", e.target.value)}
                    />
                </label>
                <label>MAC:
                    <br/>
                    <input
                        className={`MACInput`}
                        type="text"
                        value={inputValues.MAC || ""}
                        id={`MACInput`}
                        onChange={(e) => handleInputChange("MAC", e.target.value)}
                    />
                </label>
                <label>IccId:
                    <br/>
                    <input
                        className={`IccIdInput`}
                        type="text"
                        value={inputValues.IccId || ""}
                        id={`IccIdInput`}
                        onChange={(e) => handleInputChange("IccId", e.target.value)}
                    />
                </label>
                <label>IMEI:
                    <br/>
                    <input
                        className={`imeiInput`}
                        type="text"
                        value={inputValues.imei || ""}
                        id={`imeiInput`}
                        onChange={(e) => handleInputChange("imei", e.target.value)}
                    />
                </label>
                <label>Phone Number:
                    <br/>
                    <input
                        className={`PhoneNumInput`}
                        type="tel"
                        value={inputValues.PhoneNum || ""}
                        id={`PhoneNumInput`}
                        onChange={(e) => handleInputChange("PhoneNum", e.target.value)}
                    />
                </label>
                <label>Location:
                    <br/>
                    <input
                        className={`LocationInput`}
                        type="text"
                        value={inputValues.Location || ""}
                        id={`LocationInput`}
                        onChange={(e) => handleInputChange("Location", e.target.value)}
                    />
                </label>
                <label>Room:
                    <br/>
                    <input
                        className={`RoomInput`}
                        type="text"
                        value={inputValues.Room || ""}
                        id={`RoomInput`}
                        onChange={(e) => handleInputChange("Room", e.target.value)}
                    />
                </label>
                <label>Owner:
                    <br/>
                    <input
                        className={`OwnerInput`}
                        type="text"
                        value={inputValues.Owner || ""}
                        id={`OwnerInput`}
                        onChange={(e) => handleInputChange("Owner", e.target.value)}
                    />
                </label>
                <label>Term ID:
                    <br/>
                    <input
                        className={`TermIdInput`}
                        type="text"
                        value={inputValues.TermId || ""}
                        id={`TermIdInput`}
                        onChange={(e) => handleInputChange("TermId", e.target.value)}
                    />
                </label>
                <label>Purchase Date:
                    <br/>
                    <input
                        className={`dateField`}
                        type="date"
                        value={inputValues.PurchaseDate || "dd/mm/yyyy"}
                        id={`PurchaseDateInput`}
                        onChange={(e) => handleInputChange("PurchaseDate", e.target.value)}
                    />
                </label>
                <label>Warranty Date:
                    <br/>
                    <input
                        className={`dateField`}
                        type="date"
                        value={inputValues.Warranty || "dd/mm/yyyy"}
                        id={`WarrantyInput`}
                        onChange={(e) => handleInputChange("Warranty", e.target.value)}
                    />
                </label>
                <label>Inventory Status:
                    <br/>
                    <select
                        className={`dropDown`}
                        id={`InventoryStatusInput`}
                        onChange={(e) => handleInputChange("InventoryStatus", e.target.value)}
                        value={inputValues.InventoryStatus || "Storage"}
                    >
                        {statusDropDown.map((value)=>{
                            return (
                                <option
                                    key={"InventoryStatus"+value}
                                    value={value}
                                >
                                    {value}
                                </option>
                            )
                        })}
                    </select>
                </label>
                <label className='textAreaLabel'>Notes:
                    <br/>
                    <textarea
                        className={`notesInput`}
                        value={inputValues.Notes || ""}
                        id={`NotesInput`}
                        onChange={(e) => handleInputChange("Notes", e.target.value)}
                        rows="10" 
                        // cols="75"
                    />
                </label>
                <label style={{width:"100%", float:"right"}}>
                    <div className='submitContainer'>
                        <input 
                            className='formSubmitButton'
                            type="Submit" 
                            onClick={handleUpdatedDeviceClick}
                            defaultValue="Update Device"
                        />
                        <button className='QRButton' type="button" onClick={handleQRClick}>
                            Add to QR Labels
                        </button>
                        <button className="surplusButton" type="button" onClick={handleMarkSurplusClick}>
                            Surplus Device
                        </button>
                    </div>
                </label>
            </React.Fragment>
        </form>
    )
};

export default Device;
