const { Server } = require("socket.io");

module.exports.chatSockets=function(socketServer)
{  
   const io=new Server(socketServer,{cors:{origin:"*"}})
   io.on('connection',(socket)=>{
       console.log("new connection received ",socket.id);
   });
}