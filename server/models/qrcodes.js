const { Schema, model } = require('mongoose');

const QRSchema = new Schema(
  {
    cellname:{
      type: String,
      required: true
    },
    available:{
        type: Boolean,
        required: true
    },    
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
    versionKey: false,
  } 
)

const QRCodes = model('QRCodes', QRSchema)

module.exports = QRCodes;