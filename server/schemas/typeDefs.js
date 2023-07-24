const { gql } = require('apollo-server-express');

const typeDefs = gql`

scalar Date

type Device{
    _id: ID!
    serial: String
    model: String
    manufacturer: String
    gtInventory: String
    os: String
    imei: Int
    iccId: Int
    phoneNum: Int
    mac: String    
    status: String
    warranty: Date
    purchaseDate: Date
    hostname: String
    ip:String
    owner:String
    location:String
    room:String
    termId:String
    notes:String
}

type Query{
    getDevices(_id:ID): [Device]
}
`;
module.exports = typeDefs