require('dotenv').config({ path: './vars.env' });

import app from './app';

const server = app.listen(process.env.PORT, function () {
	console.log('Listening to port: ', process.env.PORT);
});


const testWord = 'wonderful';


const io = require('socket.io').listen(server);



io.on('connection', function (socket) {

	// Happens if the user leaves the chat / or disconnects
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});

	// When a user posts a new message
	socket.on('new message', checkHangman);

	socket.on('get word', getWord)
});


function checkHangman(msg) {
	if (msg.startsWith('/hangman', 0)) {
		return checkType(msg);;
	}
	
	io.emit('new message', msg);
}

function checkType(msg) {
	const message = msg.split(' ');

	if (message.length > 1) {
		const firstWord = message[1].toLowerCase();
		
		if (firstWord === 'word' && message.length > 2) {
			const word = message[2];
			io.emit('new message', word);
		} else {
			const letter = message[1][0];
			io.emit('new message', letter);
		}
		
		return;
	}

	// Give a error saying that a word has to be passed in 
	return;
}

function getWord() {
	io.emit('get word', testWord);
}