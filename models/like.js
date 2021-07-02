//importing the mongoose module
const mongoose=require('mongoose');

//creating the like schema
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
    //this field is for defining the type of the liked object 
    onModel:{
        type:String,
        require:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
});

//creating the like model
const Like=mongoose.model('Like',likeSchema);

//exporting the model
module.exports=Like;