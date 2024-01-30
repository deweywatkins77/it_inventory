const { gql } = require('apollo-server-express');

const typeDefs = gql`

scalar Date

type Device{
    _id: ID!
    Serial: String
    Model: String
    Manufacturer: String
    GTInventory: String
    OS: String
    imei: Int
    IccId: Int
    PhoneNum: Int
    MAC: String    
    Status: String
    Warranty: Date
    PurchaseDate: Date
    Hostname: String
    IP:String
    Owner:String
    Location:String
    Room:String
    TermId:String
    Notes:String
}

input newDeviceData{
    Serial: String
    Model: String
    Manufacturer: String
    GTInventory: String
    OS: String
    imei: Int
    IccId: Int
    PhoneNum: Int
    MAC: String    
    Status: String
    Warranty: Date
    PurchaseDate: Date
    Hostname: String
    IP:String
    Owner:String
    Location:String
    Room:String
    TermId:String
    Notes:String
}

type Query{
    getDevices(_id:ID): [Device]
}

type Mutation{
    updateDevice(_id:ID, data:newDeviceData): Device
}
`;
module.exports = typeDefs