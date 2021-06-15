const mongoose=require('mongoose');

const likeSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
    },
    //this defines the objectId of the object.
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath:'onModel'
    },
    //this field is for defining the type of the liked object since this is a dynamic reference.
    onModel:{
        type:String,
        require:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
});

const Like=mongoose.model('Like',likeSchema);
module.exports=Like;