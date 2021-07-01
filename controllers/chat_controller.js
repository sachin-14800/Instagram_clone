const Follow=require('../models/follow');
const User=require('../models/user');
const Message=require('../models/messages');
module.exports.chat=async function(req,res)
{
    let user=await User.findById(req.params.id);
    let chats=await Follow.find({from_user:user})
    .populate('from_user')
    .populate('to_user');
    let requests=await Follow.find({to_user:user})
    .populate('from_user')
    .populate('to_user');
    res.render('chat-users',{
        title:"Chat Engine",
        chats:chats,
        requests:requests
    });
}
module.exports.chatting=async function(req,res){
    let fromuser=await User.findById(req.query.from);
    let touser=await User.findById(req.query.to);
    let compare=fromuser.id.localeCompare(touser.id);
    let room;
    if(compare>0)
        room=fromuser.id+touser.id;
    else
    room=touser.id+fromuser.id;
    let message=await Message.find({room:room})
    .sort('-createdAt')
    .populate('from_user')
    .populate('to_user');
    
    res.render('_chat_box',{
        title:'Chat',
        from_user:fromuser,
        to_user:touser,
        messages:message
    });
}