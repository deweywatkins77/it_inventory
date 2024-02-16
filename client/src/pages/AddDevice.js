import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { getDevices, getQRDevices } from '../utils/queries';
import { addDevice } from '../utils/mutations';
import initializeFields from '../utils/initializeFields';
import { statusDropDown, deviceTypeList } from '../utils/htmlInputs'
import "../styles/deviceForm.css"

const AddDevice = () =>{
    const [addNewDevice] = useMutation(addDevice)
    const [inputValues, setInputValues] = useState({...initializeFields, 
                                                    InventoryStatus: statusDropDown[0], 
                                                    DeviceType:deviceTypeList[0]});
    const handleInputChange = (key, value) => {
        setInputValues(prevValues => ({
            ...prevValues,
            [key]: value,
        }));
    };

    const handleAddDeviceClick = async ()=>{
        try{
            if (!inputValues.Serial || !inputValues.Model || !inputValues.Manufacturer) {
                alert('Please fill out all required fields.');
                return;
            }
            const formattedInputValues = { ...inputValues };
            if (formattedInputValues.Warranty) {
                const warrantyDate = new Date(formattedInputValues.Warranty);
                formattedInputValues.Warranty = warrantyDate.toISOString();
            }else{
                formattedInputValues.Warranty = new Date().toISOString();
            }

            if (formattedInputValues.PurchaseDate) {
                const newPurchaseDate = new Date(formattedInputValues.PurchaseDate);
                formattedInputValues.PurchaseDate = newPurchaseDate.toISOString();
            }else{
                formattedInputValues.PurchaseDate = new Date().toISOString();
            }

            //set device to have label printed
            formattedInputValues.QRCode = true

            const {data} = await addNewDevice({
                variables: { data: formattedInputValues },
                refetchQueries: [{ query: getDevices }, {query:getQRDevices}],
            })
            alert(`Device has been added! ID is ${data.addDevice._id}`)
        }catch(error){
            alert('An error occurred while adding the device: '+error.message);
        }
    }

    return (
        <form className="deviceForm">
            <label className='requiredeLabel'>Serial Number:  <span className='requiredAst'>*</span>
                <br/>
                <input
                    className={`SerialInput`}
                    type="text"
                    value={inputValues.Serial}
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
                    value={inputValues.GTInventory}
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
                    value={inputValues.Model}
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
                    value={inputValues.Manufacturer}
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
                    value={inputValues.OS}
                    id={`OSInput`}
                    onChange={(e) => handleInputChange("OS", e.target.value)}
                />
            </label>
            <label>Host Name:
                <br/>
                <input
                    className={`HostnameInput`}
                    type="text"
                    value={inputValues.Hostname}
                    id={`HostnameInput`}
                    onChange={(e) => handleInputChange("Hostname", e.target.value)}
                />
            </label>
            <label>IP:
                <br/>
                <input
                    className={`IPInput`}
                    type="text"
                    value={inputValues.IP}
                    id={`IPInput`}
                    onChange={(e) => handleInputChange("IP", e.target.value)}
                />
            </label>
            <label>MAC:
                <br/>
                <input
                    className={`MACInput`}
                    type="text"
                    value={inputValues.MAC}
                    id={`MACInput`}
                    onChange={(e) => handleInputChange("MAC", e.target.value)}
                />
            </label>
            <label>IccId:
                <br/>
                <input
                    className={`IccIdInput`}
                    type="text"
                    value={inputValues.IccId}
                    id={`IccIdInput`}
                    onChange={(e) => handleInputChange("IccId", e.target.value)}
                />
            </label>
            <label>IMEI:
                <br/>
                <input
                    className={`imeiInput`}
                    type="text"
                    value={inputValues.imei}
                    id={`imeiInput`}
                    onChange={(e) => handleInputChange("imei", e.target.value)}
                />
            </label>
            <label>Phone Number:
                <br/>
                <input
                    className={`PhoneNumInput`}
                    type="tel"
                    value={inputValues.PhoneNum}
                    id={`PhoneNumInput`}
                    onChange={(e) => handleInputChange("PhoneNum", e.target.value)}
                />
            </label>
            <label>Location:
                <br/>
                <input
                    className={`LocationInput`}
                    type="text"
                    value={inputValues.Location}
                    id={`LocationInput`}
                    onChange={(e) => handleInputChange("Location", e.target.value)}
                />
            </label>
            <label>Room:
                <br/>
                <input
                    className={`RoomInput`}
                    type="text"
                    value={inputValues.Room}
                    id={`RoomInput`}
                    onChange={(e) => handleInputChange("Room", e.target.value)}
                />
            </label>
            <label>Owner:
                <br/>
                <input
                    className={`OwnerInput`}
                    type="text"
                    value={inputValues.Owner}
                    id={`OwnerInput`}
                    onChange={(e) => handleInputChange("Owner", e.target.value)}
                />
            </label>
            <label>Term ID:
                <br/>
                <input
                    className={`TermIdInput`}
                    type="text"
                    value={inputValues.TermId}
                    id={`TermIdInput`}
                    onChange={(e) => handleInputChange("TermId", e.target.value)}
                />
            </label>
            <label>Purchase Date:
                <br/>
                <input
                    className={`dateField`}
                    type="date"
                    value={inputValues.PurchaseDate}
                    id={`PurchaseDateInput`}
                    onChange={(e) => handleInputChange("PurchaseDate", e.target.value)}
                />
            </label>
            <label>Warranty Date:
                <br/>
                <input
                    className={`dateField`}
                    type="date"
                    value={inputValues.Warranty}
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
                    value={inputValues.Notes}
                    id={`NotesInput`}
                    onChange={(e) => handleInputChange("Notes", e.target.value)}
                    rows="10" 
                    cols="74"
                />
            </label>
            <label style={{width:"100%", float:"right"}}>
                <div className='submitContainer'>
                    <input
                        className='formSubmitButton'
                        type="submit" 
                        onClick={handleAddDeviceClick}
                        value= "Add Device"
                    />
                </div>
            </label>
        </form>
    );
}

export default AddDevice