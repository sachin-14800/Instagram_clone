//importing the mongoose module
const mongoose=require('mongoose');

//creating a schema for storing which user has send request to which user
const followSchema=mongoose.Schema({
    from_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    to_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
});

//creating the model
const Follow=mongoose.model('Follow',followSchema);

//exporting the model
module.exports=Follow;