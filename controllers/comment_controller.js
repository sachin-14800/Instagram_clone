const Post=require('../models/post');
const Comment=require('../models/comment');
const Like=require('../models/like');
const commentsMailer=require('../mailers/comments_mailer');
const commentEmailWorker=require('../workers/comment_email_worker');
const queue = require('../config/kue');
module.exports.create=async function(req,res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
    let comment=await Comment.create({content:req.body.content,post:req.body.post,user:req.user._id});
       post.comments.push(comment);
        post.save();
         comment=await comment.populate('user','name email').execPopulate();
        
        // commentsMailer.newComment(comment);
        //adding worker 
        let job=queue.create('emails',comment).save(function(err){
            if(err)
            {
                console.log('Error in creating queue');
                return ;
            }
            console.log(job.id);
        });
        req.flash('success','Comment added');
        res.redirect('/');
        }
    }
    catch(err)
    {
        req.flash('error',err);
        return res.redirect('back');
    }
}
module.exports.destroy=async function(req,res)
{
    
   try{
    let comment=await Comment.findById(req.params.id);
    let postId=comment.post;
     let post=await Post.findById(postId);
     if(comment.user==req.user.id || post.user==req.user.id)
     {  
     comment.remove();
     let post= await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
    //  await Like.deleteMany({Likeable:comment._id,onModel:'Comment'});
     req.flash('success','Comment deleted');
     return res.redirect('back');
     }
     else
     {
        req.flash('error','You are not authorized');
         return res.redirect('back');
     }
   }
   catch(err){
    req.flash('error',err);
    return res.redirect('back');
   }
}