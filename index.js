const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let userIds = [];
io.on('connection', (socket) => {
    userIds.push(socket.id);
    //console.log(userIds.length);
    socket.on('disconnect', () => {
      let index = userIds.indexOf(socket.id)
      if(index > -1) {
        userIds.splice(index, 1); //Start from index and go ahead 1 (deletes itself, 0 will delete nothing)
      }
      //console.log(userIds.length);
    });

    socket.on('client message', (msg) => {
        console.log(`${socket.id} : ${msg}`);
        let obj = {
          msg: msg,
          id: socket.id
        }
        io.emit('server message', /*socket.id + "send message: " + msg*/ obj);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});

/* Keep track of number of connections and disconnections

let counter = 0;

io.on('connection', (socket) => {
    console.log(socket.id);
    console.log('a user connected');
    counter++;
    console.log(counter);
    socket.on('disconnect', () => {
      console.log('user disconnected');
      counter--;
      console.log(counter);
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});

*/

/* Keeping track number of users by there ids
let userIds = [];
io.on('connection', (socket) => {
    userIds.push(socket.id);
    console.log(userIds.length);
    socket.on('disconnect', () => {
      let index = userIds.indexOf(socket.id)
      if(index > -1) {
        userIds.splice(index, 1); //Start from index and go ahead 1 (deletes itself, 0 will delete nothing)
      }
      console.log(userIds.length);
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});
*/ 