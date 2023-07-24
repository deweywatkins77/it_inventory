import { gql } from '@apollo/client';

export const getDevices = gql`
    query getDevices($id: ID) {
        getDevices(_id: $id){
        _id
        serial
        model
        manufacturer
        gtInventory
        os
        imei
        iccId
        phoneNum
        mac
        status
        warranty
        purchaseDate
        hostname
        ip
        owner
        location
        room
        termId
        notes
        }
    }`