// connection.js
const { connect, connection } = require('mongoose');

// Explicitly set the URI (replace with your actual MongoDB URI)
const uri = 'mongodb+srv://root:Timrp123!@cluster0.wprmk4t.mongodb.net/invManagement?retryWrites=true&w=majority&authMechanism=DEFAULT';
console.log('URI:', uri);

connect('mongodb+srv://root:Timrp123!@cluster0.wprmk4t.mongodb.net/invManagement?retryWrites=true&w=majority&authMechanism=DEFAULT', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection;