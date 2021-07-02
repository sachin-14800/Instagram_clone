//importing the mongoose module
const mongoose=require('mongoose');
//for storing the images
const multer=require('multer');
//path module
const path=require('path');
//module for file read write 
const fs=require('fs');
//determing a path for images to be stored
const POST_PATH=path.join('/uploads/posts');

//creating the schema for post including which user post it + its content and path of image and asociated comments
// and like 
const postSchema=new mongoose.Schema({
    path:{
        type:String,
    },
    content:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    likes:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }
    ]
},{
    timestamps:true
});

//determing the location and path for storing the images
let storage=multer.diskStorage({
    destination:function(req,file,cb){
        let paths=path.join(__dirname,'..',POST_PATH,'/',req.user.name);
        // console.log(paths);
        if(!fs.existsSync(paths))
        { fs.mkdirSync(paths);}
        cb(null,paths);
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());
    }
});

//function for multer to determine the location of the post
postSchema.statics.uploadedPost=multer({storage:storage}).single('post');
postSchema.statics.postPath=POST_PATH;

//creating the model
const Post=mongoose.model('Post',postSchema);

//exporting the model
module.exports=Post;