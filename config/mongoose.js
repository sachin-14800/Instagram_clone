const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/instagram_clone');

const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));

db.once('open',function(){
    console.log("Successful connection to the database");
})