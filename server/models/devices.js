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

    DeviceType:{
        type: String
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
        type: String
    },

    IccId:{
        type: String
    },

    PhoneNum:{
        type: String
    },

    MAC:{
        type: String
    },

    InventoryStatus:{
        type: String,
        required: true
    },

    Warranty: {
        type: Date,
        default: Date.now,
        get: function (dateListed) {
        //   const options = {
        //     month: '2-digit',
        //     day: '2-digit',
        //     year: 'numeric',
        //   };
        //   console.log(dateListed.toLocaleDateString('en', options))
        //   console.log(dateListed.toISOString().split('T')[0])
        formattedDate = dateListed.toISOString().split('T')[0]
          return formattedDate;
        },
    },
    
    PurchaseDate: {
        type: Date,
        default: Date.now,
        get: function (purchaseDate) {
        // const options = {
        //     day: '2-digit',
        //     month: '2-digit',
        //     year: 'numeric',
        // };
        // return purchaseDate.toLocaleDateString('en', options);
        formattedDate = purchaseDate.toISOString().split('T')[0]
          return formattedDate;
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
    },

    QRCode:{
        type: Boolean
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