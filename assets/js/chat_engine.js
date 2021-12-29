 class ChatEngine{
     constructor(chatBoxId,userEmail){  
         this.chatboxId=$(`#${chatBoxId}`);
         this.userEmail=userEmail;

         this.socket=io("http://localhost:5000");
         if(this.userEmail)
         {
             this.connectionHandler();
         }
     }

     connectionHandler(){
         let self=this;
         this.socket.on('connect',function(){
             console.log("connection established using socket ...!");
             self.socket.emit('join_room',{
                 useremail:self.userEmail,
                 chatroom:'codeial'
             });
             self.socket.on('userjoined',function(data){
                 console.log('a user is joined!',data);
             })
         });
         //send a message on clicking the send message button
         $('#send-message').click(function(){
             let msg=$('#chat-message-input').val();
             if(msg!=''){
                 self.socket.emit('send_message',{
                     message:msg,
                     user_email:self.userEmail,
                     chatroom:'codeial'
                 });
             }
         });
         self.socket.on('receive_message',function(data){
             console.log("message received ",data.message);

             let newMessage=$('<li>');
             let messageType='others-message';
             if(data.user_email==self.userEmail)
             {
                 messageType='self-message';
             }
             newMessage.append(`<span>${data.message}</span>`);
             newMessage.addClass(messageType);
             $('.chat-list').append(newMessage);
         });
     }
 }