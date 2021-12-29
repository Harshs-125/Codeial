const { Server } = require("socket.io");

module.exports.chatSockets=function(socketServer)
{  
   const io=new Server(socketServer,{cors:{origin:"*"}})
   io.on('connection',(socket)=>{
       console.log("new connection received ",socket.id);
       socket.on('disconnect',function(){
        console.log('socket disconnected');
    });
    socket.on('join_room',function(data){
        console.log("joining request received", data.chatroom);
        socket.join(data.chatroom);
        io.in(data.chatroom).emit('userjoined',data.useremail);
    })
   });
   
}