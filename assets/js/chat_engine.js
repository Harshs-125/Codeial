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
     }
 }