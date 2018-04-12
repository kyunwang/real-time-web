require('dotenv').config({ path: './vars.env' });

import app from './app';

import h from '../src/scripts/helpers';


const server = app.listen(process.env.PORT, function () {
	console.log('Listening to port: ', process.env.PORT);
});

const hangmanAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z'];

const hangmanWord = 'wonderfull';
// Create a array for the hangman game
let wordUnderscores = hangmanWord.split('').map(letter => '_');


const io = require('socket.io').listen(server);

io.on('connection', function (socket) {
	io.emit('new_user', 'SYSTEM: type `/hangman letter` to guess a letter. type `/hangman word myword` to guess a word');

	// Happens if the user leaves the chat / or disconnects
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});

	// When a user posts a new_message
	socket.on('new_message', checkHangman);

	socket.on('set_word', setWord);
	socket.on('set_letter_board', setLetterBoard);
});



function checkHangman(msg) {
	if (msg.startsWith('/hangman', 0)) return checkType(msg);
	
	io.emit('new_message', msg);
}



function checkType(msg) {
	const message = msg.split(' ');

	if (message.length > 1) {
		const firstWord = message[1].toLowerCase();
		
		if (firstWord === 'word' && message.length > 2) {
			const word = message[2];
			const result = checkWord(word);
			
			return io.emit('guess_word', result);
		} else {
			const letter = message[1][0];
			const result = checkLetter(letter);

			return io.emit('guess_letter', result);
		}	
	}
	
	io.emit('new_message', 'SYSTEM: Insert a valid letter/word please');
}



function setWord() {
	io.emit('set_word', wordUnderscores);
}

function setLetterBoard() {
	io.emit('set_letter_board', hangmanAlphabet);
}


function checkLetter(letter) {
	const letterIndexes = h.searchLetter(hangmanWord, letter);
	// const alphabetIndex = h.searchLetter(hangmanAlphabet, letter);
	const alphabetIndex = hangmanAlphabet.indexOf(letter);
	hangmanAlphabet.splice(alphabetIndex, 1);

	// Update the letterboard
	setLetterBoard();
	
	if (letterIndexes.length) {
		letterIndexes.forEach(index => wordUnderscores[index] = letter);

		// Update the letters
		setWord();

		return {
			correct: true,
			result: letter
		};
	}

	return {
		correct: false,
		result: `There is no letter: ${letter} in the word.`
	};
}

function checkWord(word) {
	if (hangmanWord === word) {
		wordUnderscores = word.split('');

		// Update the letters
		setWord();

		return {
			correct: true,
			result: word
		};
	}
	return {
		correct: false,
		result: `Your guess of: ${word} is not correct.`,
	}
}

