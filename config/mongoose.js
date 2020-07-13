// using monggose ODM to interact with mongodb
const mongoose = require('mongoose');
// connecting to mongodb
mongoose.connect('mongodb://localhost/HOSPITAL_API');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;