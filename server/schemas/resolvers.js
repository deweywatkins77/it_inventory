const { Devices, Templates } = require('../models');

const resolvers = {
    Date: {
        resolve: (date) => {
            const formattedDate = date.toLocaleDateString("en-GB");
            return formattedDate;
        },
    },

    Query: {
        getDeviceById: async (ID)=>{
            try{
                return await Devices.find({_id:ID})
            }catch(err){
                return err
            }

        }
    }
}

module.exports = resolvers