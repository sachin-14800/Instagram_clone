const mongoose=require('mongoose');

const messageSchema=new mongoose.Schema({
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

const Messages=mongoose.model('Messages',messageSchema);
module.exports=Messages;