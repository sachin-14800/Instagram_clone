//middleware for starting the chat engine to communicate from frontend


//model for storing the messages of users
const Message=require('../models/messages');


module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer,{
        cors:{
            origin:'http://35.154.198.18',
            methods: ["GET", "POST"],
            credentials: true
        }
    });
    //connecting the socket
    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);

        //when socket is disconnected
        socket.on('disconnect',function(){
            console.log('socket disconnected!');
        });

        //event recieved for joining the room
        socket.on('join_room',function(data){
            //if exists then enter the user else create the chatroom
            socket.join(data.chatroom);
            //emit in a specific chatroom
            io.in(data.chatroom).emit('user_joined',{userid:data.userid,recieverid:data.recieverid});
        });

        //event recieved when message is send to other user
        socket.on('send_message',async function(data){
            let message=Message.create({room:data.chatroom,from_user:data.userid,to_user:data.recieverid,content:data.message});

            //emiting an event for recieving the message 
            io.in(data.chatroom).emit('receive_message',data);
        });

        });
    
}