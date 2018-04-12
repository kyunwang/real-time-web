const app = require('express')();
const http = require('http');
const server = http.createServer(app);

const io = require('socket.io').listen(server);

io.on('connection', function(socket){
	console.log('a user connected');
});