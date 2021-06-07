const User = require("../models/user");
const path=require('path');
const fs=require('fs');

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
    if(req.user.id==req.params.id)
    {
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err)
                {
                    console.log('Multer Error',err);
                }
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file)
                {
                    if(user.avatar)
                    {
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    //this is saving the path
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
                });
            }catch(err)
            {
                req.flash('error',err);
                return res.redirect('back');
            }
    }
    else
    {
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
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
    req.logout();
    req.flash('success','Logged Out successfully');
    return res.redirect('/');
    
    // req.session.regenerate(function(err){
    //     res.clearCookie('instagram');
        
    //     res.redirect('/');
    // });
   
}