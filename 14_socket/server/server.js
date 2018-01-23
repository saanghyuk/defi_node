const express = require('express');
const socketIO = require('socket.io');
const http= require('http');
const app = express();

//Work Express with SocketIO
const server= http.createServer(app);
const io = socketIO(server);



app.use(express.static(__dirname+'/../public'));


io.on('connection', (socket)=>{


   console.log('someone is connected');

   socket.on('join',(data)=>{
      console.log(data);

       socket.join("room-"+data.room);

       //이건 Room에만 보냄
       socket.broadcast.to("room-"+data.room).emit('userJoined',
           `${data.user} joined the room`)
   });


   // socket.on('sendMess', function(message,cb) {
   //     console.log('new Message', message);
   //
   //     //io.emit 하면 모두한테 다 가지만 socket.emit하면 나한테만 감
   //     //나는 제외하고 나머지한테만 보내고 싶다면? --> socket.broadcast.emit
   //     socket.broadcast.emit('newMessage', {
   //         from: "Sanghyuk",
   //         message: "I am a crazy message"
   //     });
   //
   //     //이건 나한테만 오네
   //     cb()
   // });
   //
   socket.on('disconnect', ()=>{
      console.log('user disconnected from server')
   });
});


const port =process.env.PORT || 3000;
server.listen(port, ()=>{
   console.log(`Server running on port ${port}`)
});