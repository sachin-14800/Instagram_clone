//importing the mongoose module
const mongoose=require('mongoose');

//creating the comment schema with its content and which user made it and on which post it is added 
//and all the likes it has
const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    likes:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }
    ]
},{
    timestamps:true
});

//creating a new model for comments
const Comment=mongoose.model('Comment',commentSchema);

//exporting the comment model
module.exports=Comment;