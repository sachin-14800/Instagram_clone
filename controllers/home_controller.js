const Post=require('../models/post');
const User=require('../models/user');
const Follow=require('../models/follow');
module.exports.home=async function(req,res)
{
    try{
    let posts=await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        },
        populate:{
            path:'likes'
        }
    }).populate('likes');
    let users= await User.find({});
    let chats;
    let user;
    if(req.user){
     user=await User.findById(req.user._id);
    chats=await Follow.find({to_user:user})
    .populate('from_user')
    .populate('to_user');
    }
    return res.render('home',{
        title:"Home page",
        post:posts,
        followers:chats,
        all_users:users,
        value:true,
    });
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
    
}