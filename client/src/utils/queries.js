import { gql } from '@apollo/client';

export const getDevices = gql`
query getDevices($id: ID) {
    getDevices(_id: $id){
      serial
      gtInventory
      hostname
      ip
      mac
      manufacturer
      model
      os
      status
      purchaseDate
      warranty
      owner
      location
    }
  }`