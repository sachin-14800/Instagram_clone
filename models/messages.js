//importing the mongoose module
const mongoose=require('mongoose');

//creating the schema for message model for storing user messages
const messageSchema=new mongoose.Schema({
    //room id of users
    room:{
        type:String,
    },
    from_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    to_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    content:{
        type:String,
    }
},{
    timestamps:true
});

//creating the model for messages
const Messages=mongoose.model('Messages',messageSchema);

//exporting the model
module.exports=Messages;