const { Schema, model } = require('mongoose');

const DevicesSchema = new Schema(
  {
    Serial:{
        type: String,
        required: true
    },

    Model:{
        type: String,
        required: true
    },

    Manufacturer:{
        type: String,
        required: true
    },

    GTInventory:{
        type:String
    },

    OS:{
        type: String
    },

    imei:{
        type: Number
    },

    IccId:{
        type: Number
    },

    PhoneNum:{
        type: Number
    },

    MAC:{
        type: String
    },

    Status:{
        type: String,
        required: true
    },

    Warranty: {
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
    
    PurchaseDate: {
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

    Hostname:{
        type: String
    },

    IP:{
        type: String
    },

    Owner:{
        type: String
    },

    Location:{
        type: String
    },
    
    Room:{
        type: String
    },

    TermId:{
        type: String
    },

    Notes:{
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