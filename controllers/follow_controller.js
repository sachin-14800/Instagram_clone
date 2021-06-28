const Friend=require('../models/follow');
const User=require('../models/user');

module.exports.toggleFollow=async (req,res)=>{
    try{
        let deleted=false;
    let followable=await Friend.find({from_user:req.query.fromuser,to_user:req.query.touser});
    let user=await User.findById({user_id:req.query.fromuser._id});
    if(followable)
    {
        user.followers.pull(followable._id);
        user.save();
        followable.remove();
        deleted=true;
    }
    else{
        let friend=await Friend.create({from_user:req.query.fromuser,to_user:req.query.touser});
        user.followers.push(friend._id);
        user.save();
    }
    return res.json({
        message:"Request Successful!",
            data:{
                deleted:deleted
            }
    });
    }
    catch(err){
        if(err)
        {
            return res.json(500,{message:'Internal Server Error'});
        }
    }
};