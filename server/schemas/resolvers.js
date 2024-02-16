const { GraphQLScalarType } = require('graphql')
const { Devices, Templates, QRCodes } = require('../models');
const { Types } = require('mongoose');

const checkID=(id)=>{
    return Types.ObjectId.isValid(id)
}

const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'A date and time, represented as an ISO-8601 string',
        serialize: (value) => {
            formattedDate = new Date(value)
            return formattedDate.toISOString().split('T')[0]
        },
        parseValue: (value) => new Date(value),
        parseLiteral: (ast) => new Date(ast.value)
      }),

    Query: {
        getFields: async ()=>{
            try{
                const fields = Object.keys(Devices.schema.paths);
                return fields;
            }catch(err){
                console.error(err);
                return null;
            }
        },

        getDevices: async (_, {_id})=>{
            try{
                if (_id){
                    if (checkID(_id)) {
                        const device = await Devices.findOne({ _id }) || null;
                        if (device) {
                            return [device];
                        } else {
                            throw new Error('Device not found');
                        }
                    } else {
                        throw new Error('Invalid ObjectId');
                    }
                }else{ 
                    return await Devices.find({InventoryStatus: { $ne: "MarkedForSurplus" }})
                }
            }catch (err){
                console.log(err);
                throw new Error(`Error fetching device: ${err.message}`);
            }
        },

        getSurplus: async ()=>{
            try{
                return await Devices.find({InventoryStatus: { $eq: "MarkedForSurplus" }})
            }catch (err){
                console.log(err);
                throw new Error(`Error fetching device: ${err.message}`);
            }
        },

        getQRDevices: async ()=>{
            try{
                return await Devices.find({QRCode:true})
            }catch (err){
                console.log(err);
                throw new Error(`Error fetching devices: ${err.message}`);
            }
        },

        getQRCodes: async ()=>{
            try{
                return await QRCodes.find({})
                                    .sort({ cellname: 1 })
                                    .collation({ locale: 'en_US', numericOrdering: true });
            }catch (err){
                console.log(err);
                throw new Error(`Error fetching device: ${err.message}`);
            }
        },

        getIPOrder: async ()=>{
            try{
                return await Devices.find({})
                                    .sort({ IP:1 })
                                    .collation({ locale: 'en_US', numericOrdering: true });
            }catch (err){
                console.log(err);
                throw new Error(`Error fetching device: ${err.message}`);
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
        },

        addDevice: async (_, { data }) => {
            try {
                const addedDevice = await Devices.create(data);
                return addedDevice;
            } catch (err) {
                console.error(err);
                throw new Error(`Error adding device: ${err.message}`);
            }
        },

        setQRCodes: async (_, { data }) => {
            try {
                if (data){
                    const updatedQRCode = await QRCodes.findOneAndUpdate(
                                                {cellname:data.cellname}, 
                                                {$set:{available:!data.available}}, 
                                                {new:true});
                    return updatedQRCode;
                }else{
                    const resetQRCode = await QRCodes.updateMany(
                        {}, 
                        {$set:{available:true}},
                    )
                }
            } catch (err) {
                console.error(err);
                throw new Error(`Error changing availability or resetting labels: ${err.message}`);
            }
        },

        markSurplusDevice: async (_, {_id}) =>{
            try{
                if (checkID(_id)){
                    const markSurplussedDevice = await Devices.findOneAndUpdate(
                        { _id },
                        { $set: { InventoryStatus: "MarkedForSurplus" } },
                        { new: true }
                    );
                    if (markSurplussedDevice) {
                        return markSurplussedDevice;
                    } else {
                        throw new Error('Device not found');
                    }
                } else {
                    throw new Error('Invalid ObjectId');
                }
            }catch (err){
                console.log(err);
                throw new Error(`Error fetching device: ${err.message}`);
            }
        },

        setQRDevice: async (_, {_id}) =>{
            try{
                if (!_id){
                    const resetQRDevice = await Devices.updateMany(
                        {QRCode:true}, 
                        {$set:{QRCode:false}},
                    )
                }else if (checkID(_id)){
                    const setQR = await Devices.findOneAndUpdate(
                        { _id },
                        { $set: { QRCode: true } },
                        { new: true }
                    );
                    if (setQR) {
                        return setQR;
                    } else {
                        throw new Error("Couldn't add device to labels!");
                    }
                } else {
                    throw new Error('Invalid ObjectId');
                }
            }catch (err){
                console.log(err);
                throw new Error(`Error fetching device: ${err.message}`);
            }
        },

        massSetQRDevices: async (_, {data:{data:ids}}) =>{
            try{
                ids.map((device)=>{
                    if (!checkID(device)) throw new Error("Invalid id in mass set QR list")
                })    
                let massReturns = await Devices.updateMany(
                        { _id : { $in: ids}},
                        { $set: { QRCode: true } },
                    );
            }catch (err){
                console.log(err);
                throw new Error(`Error fetching device: ${err.message}`);
            }
        },

        massSetMarkSurplus: async (_, {data:{data:ids}}) =>{
            try{
                ids.map((device)=>{
                    if (!checkID(device)) throw new Error("Invalid id in mass set QR list")
                })    
                let massReturns = await Devices.updateMany(
                        { _id : { $in: ids}},
                        { $set: { InventoryStatus: "MarkedForSurplus" } },
                    );
            }catch (err){
                console.log(err);
                throw new Error(`Error fetching device: ${err.message}`);
            }
        }
    }
}

module.exports = resolvers