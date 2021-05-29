const Post=require('../models/post');
const User=require('../models/user');

module.exports.home=function(req,res)
{
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(
        function(err,posts)
        {
            if(err)
                return;
            User.find({},function(err,users){
                if(err)
                return;
                return res.render('home',{
                    title:"Home page",
                    post:posts,
                    all_users:users
                });
            });
            
        }
    );
}