// module
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// respond function
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket){
    console.log('A user is connected');
    io.emit('rooms', getRooms());
    socket.on('user', (name)=>{
        // create new user
        console.log(`username set to ${name}(${socket.id})`);
        socket.username = name; 
    })

    socket.on("new room", (room)=>{
        console.log(`${socket.username} create new room ${room}`)
        socket.room = room
        socket.join(room)
    })

    socket.on("chat message", (data)=>{
        io.in(data.room).emit('chat message', `${data.name}: ${data.msg}`);
    })

    function getRooms(){
        return "THOs"
    }
})

// handle
const port = 8888;
http.listen(port, 'localhost', function(){
    console.log(`Server running.`)
})