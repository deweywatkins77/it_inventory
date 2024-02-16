// connection.js
const { connect, connection } = require('mongoose');

// Explicitly set the URI (replace with your actual MongoDB URI)
const uri = 'mongodb://root:root@localhost:27017/invManagement?authMechanism=DEFAULT&authSource=admin';
console.log('URI:', uri);

connect('mongodb://root:root@localhost:27017/invManagement?authMechanism=DEFAULT&authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection;