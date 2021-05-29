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
    return res.redirect('/');
}
module.exports.createSession=function(req,res)
{
    return res.redirect('/');
}