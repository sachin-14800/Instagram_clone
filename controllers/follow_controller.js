const Friend=require('../models/follow');
const User=require('../models/user');

module.exports.toggleFollow=async (req,res)=>{
    try{
        let deleted=false;
        let Fromuser=await User.findById(req.query.fromuser);
    let Touser=await User.findById(req.query.touser);
    let followable=await Friend.findOne({from_user:Fromuser,to_user:Touser});
    if(followable)
    {
        Fromuser.following.pull(followable);
        Touser.followers.pull(followable);
        Fromuser.save();
        Touser.save();
        followable.remove();
        deleted=true;
    }
    else{
        let friend=await Friend.create({from_user:Fromuser,to_user:Touser});
        Fromuser.following.push(friend);
        Touser.followers.push(friend);
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