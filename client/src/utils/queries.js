import { gql } from '@apollo/client';

export const getDevices = gql`
query getDevices($id: ID) {
    getDevices(_id: $id){
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