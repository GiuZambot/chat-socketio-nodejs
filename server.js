const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });


  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

});

let port = (process.env.PORT) ? process.env.PORT : 8000;

http.listen(port, () => {
  console.log(`listening on http://localhost:${port}/`);
});