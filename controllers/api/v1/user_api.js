const User=require('../../../models/user');
const jwt=require('jsonwebtoken');
const env=require('../../../config/environment');
module.exports.index= async function(req,res){
    let users=await User.find({});
    let count=await User.count();
    let arr=[];
    for(let i=0;i<count;i++)
    {
        arr.push(users[i].name);
    }
    return res.json(200,{
        message:"List of Users",
        user_handles:arr
    })
}
module.exports.createSession=async function(req,res)
{
    try{
        let user=await User.findOne({email:req.body.email});
        if(!user || user.password!=req.body.password)
        {
            return res.json(422,{
                message:"invalid username or Password"
            });
        }
        return res.json(200,{
            message:"Sign in successful and here is your token keep it safe",
            data:{
                token:jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn:'100000'}) 
            }
        });
    }catch(err)
    {
        return res.json(500,{
            message:"internal Server Error"
        });
    }

}