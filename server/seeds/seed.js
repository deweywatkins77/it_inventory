const db = require('../config/connection');
const { Devices } = require('../models');
const devices = require('./devices.json');

db.once('open', async () => {
  await Devices.deleteMany({})

  await Devices.create(devices)

  console.log('all done!')
  process.exit(0)
});