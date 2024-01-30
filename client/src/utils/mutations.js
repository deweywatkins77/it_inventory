import { gql } from '@apollo/client';

export const updateDevice = gql`
mutation updateDevice($id: ID, $data: newDeviceData) {
    updateDevice(_id: $id, data:$data){
      _id
      Serial
      GTInventory
      Hostname
      IP
      MAC
      Manufacturer
      Model
      OS
      Status
      PurchaseDate
      Warranty
      Owner
      Location
    }
  }`