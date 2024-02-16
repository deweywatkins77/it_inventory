const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const db = require('../config/connection');
const { Devices, QRCodes } = require('../models');
const devices = require('./devices.json');
const qrcodes = require('./qrcodes.json')

db.once('open', async () => {
  const deleteDev = await Devices.deleteMany({})
  const deleteQR = await QRCodes.deleteMany({})

  const createDev = await Devices.create(devices)
  const createQR = await QRCodes.create(qrcodes)

  console.log(deleteDev, deleteQR, createDev, createQR)
  console.log('all done!')
  process.exit(0)
});