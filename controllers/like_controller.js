const Like=require('../models/like');
const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.toggleLike=async function(req,res)
{
    try{
        let likeable;
        let deleted=false;
        if(req.query.type=='Post'){
            likeable=await Post.findById(req.query.id).populate('likes');
        }
        else{
            likeable=await Comment.findById(req.query.id).populate('likes');
        }

        //check if a like already exists
        let exsistingLike=await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        });
        // if a like exists then delete it
        if(exsistingLike){
            likeable.likes.pull(exsistingLike._id);
            likeable.save();
            exsistingLike.remove();
            deleted=true;
        }
        else{
            //make  a new like
             let newLike=await Like.create({
                 user:req.user._id,
                 likeable:req.query.id,
                 onModel:req.query.type
             });
             likeable.likes.push(newLike._id);
             likeable.save();
             
        }
        return res.json(200,{
            message:"Request Successful!",
            data:{
                deleted:deleted
            }
        });
    }catch(err)
    {
        if(err)
        {
            return res.json(500,{message:'Internal Server Error'});
        }
    }
}