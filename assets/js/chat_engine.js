//Class for starting up the chat engine
class ChatEngine{
    //constructor to assign required parameters
    constructor(chatBoxId, userid,recieverid){
        this.chatBox = $(`#${chatBoxId}`);
        this.userid = userid;
        this.recieverid=recieverid;
        //creating a unique id for user to user chat experience
        let compare=userid.localeCompare(recieverid);
            let room;
            if(compare>0)
            room=userid+recieverid;
            else
            room=recieverid+userid;
        this.chatroom=room;
        //starting the socket
        this.socket = io.connect('http://35.154.198.18:5000',{
            withCredentials: true,
        });
        // function to start all socket events    
        if (this.userid){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self=this;
        this.socket.on('connect', function(){
            //established a connection using sockets
            
            // emiting an event to create room
            self.socket.emit('join_room',{
                userid:self.userid,
                recieverid:self.recieverid,
                chatroom:self.chatroom
            });

            //recieving an event when a user is joined
            self.socket.on('user_joined',function(data){
                //user joined
            });
        });

        $('#send-message').click(function(){
            
            let msg=$('#chat-message-input').val();
            // if message is present emit a event for sending the message 
            if(msg!="")
            {
                self.socket.emit('send_message',{
                    message:msg,
                    userid:self.userid,
                    recieverid:self.recieverid,
                    chatroom:self.chatroom
                });
            }
        });

        // recieving an event for recieving a message
        self.socket.on('receive_message',function(data){

            let newMessage=$('<li>');
            let messageType='other-message';
            if(data.userid==self.userid)
            {
                messageType='self-message';
            }
            // creating a new message
            newMessage.append($('<span>',{
                'html':data.message
            }));
            // class to determine which user message it is
            newMessage.addClass(messageType);

            //prepennding a message in the chat list
            $('#chat-messages-list').prepend(newMessage);

            //empty the input message that is already send
            $('#chat-message-input').val('');

            //autoscroll to the bottom when a new message arrives
            scroll_to_bottom($('#chat-message-input'));
        });   
    }
}

//function to autoscroll the chat list
var scroll_to_bottom = function(element){
    //trying to scroll the element
    var tries = 0, old_height = new_height = element.height();
    var intervalId = setInterval(function() {
        if( old_height != new_height ){    
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