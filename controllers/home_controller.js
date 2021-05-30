const Post=require('../models/post');
const User=require('../models/user');

module.exports.home=async function(req,res)
{
    try{
        let posts=await Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });
    let users= await User.find({});
     
    return res.render('home',{
        title:"Home page",
        post:posts,
        all_users:users
    });
    }
    catch(err){
        res.flash('error',err);
        return res.redirect('back');
    }
    
}