const { gql } = require('apollo-server-express');

const typeDefs = gql`

scalar Date

type Device{
    _id:ID
    Serial: String
    Model: String
    Manufacturer: String
    GTInventory: String
    OS: String
    imei: String
    IccId: String
    PhoneNum: String
    MAC: String    
    InventoryStatus: String
    Warranty: Date
    PurchaseDate: Date
    Hostname: String
    IP:String
    Owner:String
    Location:String
    Room:String
    TermId:String
    Notes:String
    DeviceType:String
    QRCode:Boolean
}

input newDeviceData{
    Serial: String
    Model: String
    Manufacturer: String
    GTInventory: String
    OS: String
    imei: String
    IccId: String
    PhoneNum: String
    MAC: String    
    InventoryStatus: String
    Warranty: Date
    PurchaseDate: Date
    Hostname: String
    IP:String
    Owner:String
    Location:String
    Room:String
    TermId:String
    Notes:String
    DeviceType:String
    QRCode:Boolean
}

type QRCode{
    _id:ID
    cellname:String
    available:Boolean
}

input QRData{
    _id:ID
    cellname:String
    available:Boolean
}

type Query{
    getDevices(_id:ID): [Device]
    getFields: [String]
    getSurplus:[Device]
    getQRCodes:[QRCode]
    getQRDevices:[Device]
    getIPOrder:[Device]
}

input massUpdate{
    data:[ID]
}

type Mutation{
    updateDevice(_id:ID, data:newDeviceData): Device
    addDevice(data:newDeviceData): Device
    markSurplusDevice(_id:ID): Device
    setQRCodes(data:QRData):QRCode
    setQRDevice(_id:ID):Device
    massSetQRDevices(data:massUpdate): Boolean
    massSetMarkSurplus(data:massUpdate): Boolean
}
`;
module.exports = typeDefs