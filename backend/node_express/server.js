const express = require('express');  
const app = express();  
const server = require('http').createServer(app);  
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

app.use(express.static(__dirname + '/node_modules'));  
app.get('/', function(req, res,next) {  
    res.send('Node JS - Express Server. Serving at: http://localhost:4200');
});


let currentUsers = []

io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('disconnect', (client) => {
      console.log('user disconnected',client);
    });

    client.on('newuser', function(data) {
      if (!currentUsers.find((e) => e.username === data.username && e.socketid === data.socketid)){
        currentUsers = currentUsers.filter((e) => e.username !== data.username)
        console.log("new user: ", data.username);
        currentUsers.push(data)
      }
    });

    client.on('newMsg', function(data) {
      console.log(data);
      let toUser = currentUsers.find((e) => e.username === data.receiver)
      console.log(toUser);
      if (toUser) client.broadcast.to(toUser.socketid).emit('receiveMsg', data);
    });
});

server.listen(4200);
console.log('Serving at: http://localhost:4200')