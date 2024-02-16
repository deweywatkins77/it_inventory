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
        InventoryStatus
        PurchaseDate
        Warranty
        Owner
        Location
      }
  }`
  
export const addDevice = gql`
  mutation addDevice($data: newDeviceData) {
    addDevice(data: $data) {
      _id
    }
  }`

export const markSurplusDevice = gql`
mutation markSurplusDevice($id: ID) {
  markSurplusDevice(_id: $id) {
    _id
  }
}`

export const setQRCodes = gql`
mutation setQRCodes($data: QRData) {
  setQRCodes(data: $data) {
    _id
    cellname
    available
  }
}`

export const setQRDevice = gql`
mutation setQRDevice($id: ID) {
  setQRDevice(_id: $id) {
    _id
  }
}`

export const massSetQRDevices = gql`
mutation massSetQRDevices($data: massUpdate){
  massSetQRDevices(data:$data)
}`

export const massSetMarkSurplus = gql`
mutation massSetMarkSurplus($data: massUpdate){
  massSetMarkSurplus(data:$data)
}`