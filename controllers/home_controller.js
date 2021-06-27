const Post=require('../models/post');
const User=require('../models/user');

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
            path:'like'
        }
    }).populate('like');
    let users= await User.find({});
     
    return res.render('home',{
        title:"Home page",
        post:posts,
        all_users:users,
        value:true
    });
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
    
}