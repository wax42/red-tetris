const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', client => {
  console.log("New client");
  client.on('event', data => { 
      console.log(data);
    });
    setTimeout(() => {
        console.log("Emit msg");
        client.emit("test_server", "Salut");
    },10000)
  client.on('disconnect', () => { /* … */ });
});



server.listen(3001);