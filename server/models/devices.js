const { Schema, model } = require('mongoose');

const DevicesSchema = new Schema(
  {
    serial:{
        type: String,
        required: true
    },

    model:{
        type: String,
        required: true
    },

    manufacturer:{
        type: String,
        required: true
    },

    gtInventory:{
        type:String
    },

    os:{
        type: String
    },

    imei:{
        type: Number
    },

    iccId:{
        type: Number
    },

    phoneNum:{
        type: Number
    },

    mac:{
        type: String
    },

    status:{
        type: String,
        required: true
    },

    warranty: {
        type: Date,
        default: Date.now,
        get: function (dateListed) {
          const options = {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          };
          return dateListed.toLocaleDateString('en', options);
        },
    },
    
    purchaseDate: {
        type: Date,
        default: Date.now,
        get: function (purchaseDate) {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        };
        return purchaseDate.toLocaleDateString('en', options);
        },
    },

    hostname:{
        type: String
    },

    ip:{
        type: String
    },

    owner:{
        type: String
    },

    location:{
        type: String
    },
    
    room:{
        type: String
    },

    termId:{
        type: String
    },

    notes:{
        type: String
    }
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
    versionKey: false,
  } 
)

const Devices = model('devices', DevicesSchema)

module.exports = Devices;