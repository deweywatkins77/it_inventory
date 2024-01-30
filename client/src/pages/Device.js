import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { getDevices } from "../utils/queries";
import { updateDevice } from '../utils/mutations';

const Device = () => {
    const { deviceId } = useParams();
    const { loading, error, data } = useQuery(getDevices, { variables: { id: deviceId } });
    const [updateDeviceMutation] = useMutation(updateDevice)
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
            console.log(_id, newDeviceData)
            const { data: { updateDevice: updateDevice } } = await updateDeviceMutation({
                variables: { id: _id, data: newDeviceData },
            });
    
            // Handle the updatedDevice as needed
            console.log('Device updated:', updateDevice);
        } catch (error) {
            console.error('Error updating device:', error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <form className="deviceForm" style={{ backgroundColor: "lightgrey", paddingTop: "10px" }}>
            {Object.entries(inputValues).map(([key, value]) => {
                if (key !== "__typename" && key !== "_id" && value) {
                    return (
                        <React.Fragment key={key}>
                            <label className={`${key}Label`}>{key}</label>
                            <input
                                className={`${key}Input`}
                                type="text"
                                value={value}
                                onChange={(e) => handleInputChange(key, e.target.value)}
                            />
                        </React.Fragment>
                         
                    );
                }
                return null;
            })}
            <button type="button" onClick={handleUpdatedDeviceClick}>
                Update Device
            </button>
        </form>
    );
};

export default Device;
