const initializeFields ={
    Serial:"",
    Model:"",
    Manufacturer:"",
    GTInventory:"",
    OS:"",
    imei:"",
    IccId:"",
    PhoneNum:"",
    MAC:"",
    InventoryStatus:"",
    Warranty:new Date().toISOString().split('T')[0],
    PurchaseDate:new Date().toISOString().split('T')[0],
    Hostname:"",
    IP:"",
    Owner:"",
    Location:"",
    Room:"",
    TermId:"",
    Notes:"",
    DeviceType:"",
}

export default initializeFields