//importing the mongoose module
const mongoose=require('mongoose');
//middleware help to store images
const multer=require('multer');
//module for read and write of the files
const fs=require('fs');
//path module
const path=require('path');
//path for user profile image
const AVATAR_PATH=path.join('/uploads/users/avatars');

//creating the user schema with email name password ,profile image,bio,followers,following users 
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"https://www.computerhope.com/jargon/g/guest-user.jpg"
    },
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Follow'
        }
    ],
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Follow'
        }
    ],
    bio:{
        type:String
    }
},{
    timestamps:true
});

//determining the path for the storage of images
let storage=multer.diskStorage({
    destination:function(req,file,cb){
        let paths=path.join(__dirname,'..',AVATAR_PATH,'/',req.user.name);
        
        if(!fs.existsSync(paths))
        { fs.mkdirSync(paths);}
        cb(null,paths);
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());
    }
});

// static
// available as model_name.uploadedAvatar
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;
//creating the model
const User=mongoose.model('User',userSchema);

//exporting the model
module.exports=User;