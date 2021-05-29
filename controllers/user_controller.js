const User = require("../models/user");

module.exports.profile=function(req,res)
{
    
    return res.render('profile',{
        title:"Instagram"
    });
}

module.exports.signUp=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_up',{
        title:"Instagram | Sign Up"
    });
}

module.exports.signIn=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_in',{
        title:"Instagram | Sign In"
    });
}

module.exports.create=function(req,res)
{
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err)
        return ;
        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err)
                return;
                return res.redirect('/user/sign-in');
            });
        }
        else
        {
            return res.redirect('/user/sign-in');
        }
    });
}
module.exports.createSession=function(req,res)
{
    return res.redirect('/');
}

module.exports.destroySession=function(req,res)
{
    // req.logout();
    // return res.redirect('/');
    req.session.destroy(function(err){
        if(err)
        return;
        res.redirect('/');
    })
}