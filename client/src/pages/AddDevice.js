import React, { useState, useEffect } from 'react';

const AddDevice = () =>{
    const fields = [
        "Serial",
        "GTInventory",
        "Hostname",
        "IP",
        "MAC",
        "Manufacturer",
        "Model",
        "OS",
        "Status",
        "PurchaseDate",
        "Warranty",
        "Owner",
        "Location",
    ];

    const [inputValues, setInputValues] = useState({});
    
    const handleInputChange = (key, value) => {
        setInputValues(prevValues => ({
            ...prevValues,
            [key]: value,
        }));
    };

    return (
        <form className="deviceForm" style={{ backgroundColor: "lightgrey", paddingTop: "10px" }}>
            {fields.map((key) => (
                <React.Fragment key={key}>
                    <label id={`${key}Label`} className={`${key}Label`}>{key}
                        <input
                            className={`${key}Input`}
                            type="text"
                            value={inputValues[key] || ''}
                            id={`${key}Input`}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                        />
                    </label>
                </React.Fragment>
            ))}
        </form>
    );
}

export default AddDevice