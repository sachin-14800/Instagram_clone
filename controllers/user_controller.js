const User = require("../models/user");

module.exports.profile=async function(req,res)
{
    try{
    let user=await User.findById(req.params.id);
    return res.render('profile',{
        title:"Instagram",
        profile_user:user
    });
    }
    catch(err)
    {
        console.log('Error',err);
        return;
    }
    
}
module.exports.update=async function(req,res)
{
    try{
    if(req.user.id==req.params.id)
    {
        let user=await User.findByIdAndUpdate(req.params.id,req.body);
        return res.redirect('back');
    }
    else
    {
        return res.status(401).send('Unauthorized');
    }
    }
    catch(err){
        console.log('Error',err);
        return ;
    }
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
    req.flash('success','Logged In successfully');
    return res.redirect('/');
}

module.exports.destroySession=function(req,res)
{
    // req.logout();
    // return res.redirect('/');
    

    req.session.destroy(function(err){
        if(err)
        return;
        req.flash('success','Logged Out successfully');
        res.redirect('/');
    })
}