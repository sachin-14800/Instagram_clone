const Friend=require('../models/follow');
const User=require('../models/user');

module.exports.toggleFollow=async (req,res)=>{
    try{
        let deleted=false;
    let followable=await Friend.findOne({from_user:req.query.fromuser,to_user:req.query.touser});
    let Fromuser=await User.findById(req.query.fromuser);
    let Touser=await User.findById(req.query.touser);
    if(followable)
    {
        Fromuser.following.pull(followable._id);
        Touser.followers.pull(followable._id);
        Fromuser.save();
        Touser.save();
        followable.remove();
        deleted=true;
    }
    else{
        let friend=await Friend.create({from_user:req.query.fromuser,to_user:req.query.touser});
        Fromuser.following.push(friend._id);
        Touser.followers.push(friend._id);
        Fromuser.save();
        Touser.save();
    }
    return res.status(200).json({
        message:"Request Successful!",
        data:{
            deleted:deleted
        }
    });
    }
    catch(err){
        if(err)
        {
            console.log(err);
            return res.json(500,{message:'Internal Server Error'});
        }
    }
};