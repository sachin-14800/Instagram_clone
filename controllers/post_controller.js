const Post=require('../models/post');
const Comment=require('../models/comment');
const Like=require('../models/like');
const path=require('path');
const fs=require('fs');
const { post } = require('../routes/post');
module.exports.display=async function(req,res){
    let post=await Post.findById(req.params.id)
    .populate('user')
    .populate({
        path:'comments',
        populate:[{
            path:'user',
            model:'User'
        },{
            path:'likes',
            model:'Like'
        }]
    }).populate('likes');
    res.render('post',{
        title:'post',
        post:post
    });
}
module.exports.create=async function(req,res){
    try{
        Post.uploadedPost(req,res,function(err){
            if(err)
            {
                console.log('Multer Error',err);
            }
            let paths=path.join(Post.postPath,'/',req.user.name);
            if(req.file)
            {
                paths=path.join(paths,'/',req.file.filename);
            }
            let post= Post.create({path:paths,content:req.body.content,user:req.user});
        });
        
        req.flash('success','New post is added');
        return res.redirect('/');
    }
    catch(err){
       req.flash('error',err);
        return res.redirect('back');
    }
   
}

module.exports.destroy=async function(req,res){
try{
    let post=await Post.findById(req.params.id);
    if(post.user==req.user.id)
        {
            
            fs.unlinkSync(path.join(__dirname,'..',post.path));
            await Like.deleteMany({likeable:post,onmodel:'Post'});
            await Like.deleteMany({_id:{$in:post.comments}});
            post.remove();
           await Comment.deleteMany({post:req.params.id});
           if(req.xhr){
               return res.status(200).json({
                   data:{
                       post_id:req.params.id
                   },
                   message:"Post deleted successfully"
               });
           }
           req.flash('success','Post successfully deleted');
           return res.redirect('/');
        }
        else{
            req.flash('error','You can not delete this post');
            return res.redirect('back');
        }
    }
    catch(err)
    {
        req.flash('error',err);
        return res.redirect('back');

    }
}