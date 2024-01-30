const { Devices, Templates } = require('../models');

const resolvers = {
    Date: {
        Date: (date) => {
            const formattedDate = date.toLocaleDateString("en-GB");
            return formattedDate;
        },
    },

    Query: {
        getDevices: async (_, {_id})=>{
            try{
                if (_id){
                    const device = await Devices.findOne({_id}) || null
                    return device ? [device] : [];
                }else{
                    return await Devices.find()
                }
            }catch(err){
                console.error(err);
                return null;
            }
        }
    },

    Mutation: {
        updateDevice: async (_,{_id, data})=>{
            try{
                const updatedDevice = await Devices.findOneAndUpdate(
                    {_id},
                    {$set: data},
                    {new:true}
                )
                if (!updatedDevice) {
                    throw new Error('Device not found');
                  }
          
                  return updatedDevice;
            } catch (error) {
                throw new Error(`Error updating device: ${error.message}`);
            }
        }
    }
}

module.exports = resolvers