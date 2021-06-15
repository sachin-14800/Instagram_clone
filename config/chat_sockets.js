
module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer,{
        cors:{
            origin:'http://localhost:8000',
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);

        socket.on('disconnect',function(){
            console.log('socket disconnected!');
        });

        socket.on('join_room',function(data){
            console.log('Joining request recieved',data);
            //if exists then enter the user else create the chatroom
            socket.join(data.chatroom);
            //emit in a specific chatroom
            io.in(data.chatroom).emit('user_joined',{user_email:data.user_email});
        });

        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('receive_message',data);
        });

        });
    
}