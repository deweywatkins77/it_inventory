const { Schema, model } = require('mongoose');

const TemplatesSchema = new Schema(
    {
        
        Model:{
            type: String
        },

        Manufacturer:{
            type: String
        },

        SerialNum:{
            type: String
        },

        DatePurchased: {
            type: Date,
            default: Date.now,
            get: function (dateListed) {
            const options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            };
            return dateListed.toLocaleDateString('en-GB', options);
            },
        }
    }
)


const Templates = model('templates', TemplatesSchema)

module.exports = Templates;