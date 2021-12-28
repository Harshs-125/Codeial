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
         this.socket.on('connect',function(){
             console.log("connection established using socket ...!");
         });
     }
 }