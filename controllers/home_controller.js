const Post=require('../models/post');


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
                return res.render('home',{
                    title:"Home page",
                    post:posts
                });
        }
    );
}