//importing the mongoose module
const mongoose=require('mongoose');

const env=require('./environment');

//connecting to the database
mongoose.connect(`mongodb://localhost/${env.db}`); //`mongodb://localhost/${env.db}`

const db=mongoose.connection;
//if some error occured
db.on('error',console.error.bind(console,'connection error:'));

//when it is successfully connected and opened
db.once('open',function(){
    console.log("Successful connection to the database");
})