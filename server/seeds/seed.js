const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const db = require('../config/connection');
const { Devices, QRCodes } = require('../models');
const devices = require('./devices.json');
const qrcodes = require('./qrcodes.json')

db.once('open', async () => {
  await Devices.deleteMany({})
  await QRCodes.deleteMany({})

  await Devices.create(devices)
  await QRCodes.create(qrcodes)

  console.log('all done!')
  process.exit(0)
});