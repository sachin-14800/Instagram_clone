//importing the mongoose module
const mongoose=require('mongoose');

//schema for reset password with a acess token and one time validity for a user
const resetPasswordSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    accessToken:{
        type:String,
        require:true
    },
    isValid:{
        type:Boolean,
        default:true
    }

},{timestamps:true});

//creating the model
const ResetPassword=mongoose.model('ResetPassword',resetPasswordSchema);

//exporting the model
module.exports=ResetPassword;