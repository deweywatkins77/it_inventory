import { gql } from '@apollo/client';

export const getFields = gql`
  query getFields{
    getFields
  }`

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
    InventoryStatus
    PurchaseDate
    Warranty
    Owner
    Location
  }
}`

export const getSurplus = gql`
query getSurplus {
  getSurplus {
    _id
    Serial
    GTInventory
    Hostname
    IP
    MAC
    Manufacturer
    Model
    OS
    InventoryStatus
    PurchaseDate
    Warranty
    Owner
    Location 
  }
}`

export const getQRCodes = gql`
query GetQRCodes {
  getQRCodes {
    cellname
    available
  } 
}`

export const getQRDevices = gql`
query getQRDevices {
  getQRDevices {
    _id
    Hostname
    Serial
  } 
}`