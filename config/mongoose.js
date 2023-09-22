const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contact_list_db');
const db = mongoose.connection;

db.on('error',console.error.bind(console,'error in conecting to db'));

db.once('open',function(){
    console.log('Mongo Server is Up!!');
});


// module.exports = db;