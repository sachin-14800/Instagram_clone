const User = require("../models/user");
const Post=require("../models/post");
const path=require('path');
const fs=require('fs');
const crypto=require('crypto');
const ResetPassword=require('../models/reset_password');
const queue = require('../config/kue');
const forgetPasswordMailer=require('../mailers/forget_password_mailer');
const passowordEmailWorker=require('../workers/password_email_worker');
const Follow = require("../models/follow");
module.exports.editProfile=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.render('edit_profile',{
            title:"Edit Post"
        });
    }
    return res.render('user_sign_up',{
        title:"Instagram | Sign Up"
    });
}
module.exports.newPost=function(req,res){
    if(req.isAuthenticated())
    {
        return res.render('newPost',{
            title:"NewPost"
        });
    }
    return res.render('user_sign_up',{
        title:"Instagram | Sign Up"
    });
}
module.exports.profile=async function(req,res)
{

    try{
    let user=await User.findById(req.params.id).populate('follow');
    let post=await Post.find({user:req.params.id})
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
    let follower=await Follow.find({from_user:req.user.id,to_user:req.params.id});
    let follow=false;
    if(follower.length!=0)
    {
        follow=true;
    }
    return res.render('profile',{
        title:"Instagram",
        profile_user:user,
        post:post,
        value:false,
        follow:follow,
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
                user.bio=req.body.bio;
                if(req.file)
                {
                    if(user.avatar)
                    {
                        if(user.avatar!="https://www.computerhope.com/jargon/g/guest-user.jpg")
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    //this is saving the path
                    user.avatar=User.avatarPath+'/'+req.user.name+'/'+req.file.filename;
                }
                user.save();
                req.flash('success',"Successfully updated");
                return res.redirect('/user/profile/'+req.params.id);
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
    // req.session.destroy(function(err){
    //     
       
    // });
   
}

//if authenticated then go to profile page
module.exports.forget=(req,res)=>{
    return res.render('forget-password',{
        title:"Forgot",
    });
}
module.exports.createToken=async (req,res)=>{
    let user=await User.findOne({email:req.body.email});
    if(!user)
    {
        req.flash('error',"First Need to sign up");
        return res.redirect('/user/sign-up');
    }
    let object=await ResetPassword.create({
        user:user,
        accessToken:crypto.randomBytes(20).toString('hex')
    });
    let job=queue.create('password',object).save(function(err){
        if(err)
        {
            console.log('Error in creating queue');
            return ;
        }
        // console.log(job.id);
    });
    req.flash('success','Email has been send');
    return res.redirect('/user/sign-in');
}

module.exports.newPassword=async (req,res)=>{
    let object=await ResetPassword.findOne({accessToken:req.params.id});
     if(object.isValid){
        req.flash('error','Password already changed');
    return res.redirect('back');}
    console.log(object.user);
    return res.render('new-password',{
        title:"Forgot",
        object:object
    });
}
module.exports.updatePassword=async(req,res)=>{
    let object=await ResetPassword.findOne({acesssToken:req.body.accessToken});
    console.log(object);
   
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');
    }

     object=await ResetPassword.findOneAndUpdate(req.body.accessToken,{isValid:false});
    object.save();
    let user=await User.findByIdAndUpdate(object.user,{password:req.body.password});
    // console.log(user.email);
    user.save();
    req.flash('success','Password Change Successfully');
    return res.redirect('/user/sign-in');
}