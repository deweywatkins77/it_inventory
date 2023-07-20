require('dotenv').config();
const { connect, connection } = require('mongoose');
connectionString = process.env.MONGO_URI;

connect(connectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = connection;