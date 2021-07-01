
class ChatEngine{
    constructor(chatBoxId, userid,recieverid){
        this.chatBox = $(`#${chatBoxId}`);
        this.userid = userid;
        this.recieverid=recieverid;
        let compare=userid.localeCompare(recieverid);
            let room;
            if(compare>0)
            room=userid+recieverid;
            else
            room=recieverid+userid;
        this.chatroom=room;
        this.socket = io.connect('http://localhost:5000',{
            withCredentials: true,
        });

        if (this.userid){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self=this;
        this.socket.on('connect', function(){
            // console.log('connection established using sockets...!');
            
            self.socket.emit('join_room',{
                userid:self.userid,
                recieverid:self.recieverid,
                chatroom:self.chatroom
            });
            self.socket.on('user_joined',function(data){
                // console.log('A user is joined',data.userid);
                // console.log('A user is joined',data.recieverid);
            });
        });

        $('#send-message').click(function(){
            
            let msg=$('#chat-message-input').val();
            if(msg!="")
            {
                // console.log(self.chatroom);
                self.socket.emit('send_message',{
                    message:msg,
                    userid:self.userid,
                    recieverid:self.recieverid,
                    chatroom:self.chatroom
                });
            }
        });

        self.socket.on('receive_message',function(data){
            // console.log('message received',data.message);

            let newMessage=$('<li>');
            let messageType='other-message';
            if(data.userid==self.userid)
            {
                messageType='self-message';
            }
            newMessage.append($('<span>',{
                'html':data.message
            }));
            newMessage.addClass(messageType);
            $('#chat-messages-list').prepend(newMessage);
            $('#chat-message-input').val('');
            scroll_to_bottom($('#chat-message-input'));
        });   
    }
}
var scroll_to_bottom = function(element){
    var tries = 0, old_height = new_height = element.height();
    var intervalId = setInterval(function() {
        if( old_height != new_height ){    
            // Env loaded
            clearInterval(intervalId);
            element.animate({ scrollTop: new_height }, 'slow');
        }else if(tries >= 30){
            // Give up and scroll anyway
            clearInterval(intervalId);
            element.animate({ scrollTop: new_height }, 'slow');
        }else{
            new_height = element.height();
            tries++;
        }
    }, 100);
}