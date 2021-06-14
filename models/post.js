const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const fs=require('fs');
const POST_PATH=path.join('/uploads/posts');

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
postSchema.statics.uploadedPost=multer({storage:storage}).single('post');
postSchema.statics.postPath=POST_PATH;

const Post=mongoose.model('Post',postSchema);

module.exports=Post;