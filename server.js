const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server)

app.get('/', (req, res)=>{
  console.log(__dirname);
  res.sendFile(__dirname + '/public/chat-client.html' );
})

io.on('connection', (client)=>{
  console.log("client connected");
  client.on('messageForServer', ({chatterName, message})=>{

    console.log("message--", message);
    console.log("name---", chatterName);

    client.emit('messageForClient', {chatterName: 'Me', message})
    client.broadcast.emit('messageForClient', {chatterName: chatterName, message})

  })
})




server.listen(9090, ()=>{
  console.log("server started.......");
})

