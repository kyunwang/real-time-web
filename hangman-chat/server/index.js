require('dotenv').config({ path: './vars.env' });

import app from './app';

const server = app.listen(process.env.PORT, function () {
	console.log('Listening to port: ', process.env.PORT);
});

const hangmanLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z'];

const hangmanWord = 'wonderful';
// Create a array for the hangman game
const wordUnderscores = hangmanWord.split('').map(letter => '_');


const io = require('socket.io').listen(server);

io.on('connection', function (socket) {
	io.emit('new user', 'type `/hangman letter` to guess a letter. type `/hangman word myword` to guess a word');

	// Happens if the user leaves the chat / or disconnects
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});

	// When a user posts a new message
	socket.on('new message', checkHangman);

	socket.on('get word', getWord);
});



function checkHangman(msg) {
	if (msg.startsWith('/hangman', 0)) return checkType(msg);
	
	io.emit('new message', msg);
}



function checkType(msg) {
	const message = msg.split(' ');

	if (message.length > 1) {
		const firstWord = message[1].toLowerCase();
		console.log('checking msg');
		
		if (firstWord === 'word' && message.length > 2) {
			const word = message[2];
			const result = checkWord(word);
			console.log('word', result);
			
			io.emit('guess_word', result);
		} else {
			const letter = message[1][0];
			const result = checkLetter(letter);
			console.log('letter', result);
			io.emit('guess_letter', result);
		}
		
		return;
	}

	// Give a error saying that a word has to be passed in 
	return;
}



function getWord() {
	io.emit('get word', hangmanWord, wordUnderscores);
}

function checkLetter(letter) {
	if (hangmanWord.indexOf(letter) > -1) {
		console.log('found letter');
		return letter;
	}
	return `There is no letter: ${letter} in the word.`;
}

function checkWord(word) {
	if (hangmanWord === word) {
		console.log('found word');
		return word;
	}
	return `Your guess of: ${word} is not correct.`;
}