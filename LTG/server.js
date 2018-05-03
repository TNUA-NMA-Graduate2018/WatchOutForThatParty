var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));
console.log("My socket server is running");

var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log("We have a new Client: " + socket.id);
    socket.on('mouse',mouseMsg);
    socket.on('schedule',scheduleMsg);

    function mouseMsg(data){
        socket.broadcast.emit('mouse',data);
        console.log("LTG : ");
        console.log(data);
    }
    function scheduleMsg(data){
        socket.broadcast.emit('schedule',data);
        console.log(data);
    }
}
