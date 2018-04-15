
import server from './index';
import h from '../src/scripts/helpers';


const hangmanAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
	'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
	't', 'u', 'v', 'w', 'x', 'y', 'z'];

const hangmanWord = 'wonderful';
// Create a array for the hangman game
let wordUnderscores = hangmanWord.split('').map(letter => '_');


const io = require('socket.io').listen(server);

// Setup for dynamic words
const hangmanConfig = {
	lives: 10,
	word: 'wonderful', // Default word
	alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
	'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
	't', 'u', 'v', 'w', 'x', 'y', 'z'],
	underscores: ['_']
}

io.on('connection', function (socket) {
	// Happens if the user leaves the chat / or disconnects
	socket.on('disconnect', function () {
		console.log('user disconnected');
		socket.broadcast.emit('user_left', {
			username: 'SYSTEM',
			msg: `${socket.self} has left the game.`
		});
	});

	socket.on('set_self', function addSelf(username) {
		socket.self = username;

		// io.emit('set_self', socket.self, socket.id);
		socket.broadcast.emit('new_user', {
			username: 'SYSTEM',
			msg: `${username} has joined the game.`
		});
	})

	// When a user posts a new_message
	socket.on('new_message', checkHangman);

	socket.on('set_word', setWord);
	socket.on('set_letter_board', setLetterBoard);


	/*==========================
	=== Start functions
	===========================*/

	function checkHangman(msg) {
		if (msg.toLowerCase().startsWith('/hangman', 0)) return checkType(msg);
		
		// io.emit('new_message', msg);
		socket.broadcast.emit('new_message', {
			username: socket.self,
			msg,
			className: 'room__message'
		});
	}



	function checkType(msg) {
		const message = msg.split(' ');

		if (message.length > 1) {
			const firstWord = message[1].toLowerCase();

			if (firstWord === 'word' && message.length > 2) {
				const word = message[2];
				const result = checkWord(word);

				// return io.emit('guess_word', result);
				return socket.broadcast.emit('guess_word', {
					username: 'SYSTEM',
					guess: result
				});
			} else {
				const letter = message[1][0];
				const result = checkLetter(letter);

				return socket.broadcast.emit('guess_letter', {
					username: 'SYSTEM',
					guess: result
				});
			}
		}

		io.emit('new_message', {
			username: 'SYSTEM',
			msg: 'Insert a valid letter/word please'
		});
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
		console.log(alphabetIndex);
		
		if (alphabetIndex > -1) {
			hangmanAlphabet.splice(alphabetIndex, 1);
		}

		// Update the letterboard
		setLetterBoard();

		if (letterIndexes.length) {
			letterIndexes.forEach(index => wordUnderscores[index] = letter);

			// Update the letters
			setWord();

			return {
				correct: true,
				result: `${socket.self} guessed the letter ${letter}. The letter ${letter} is in the word.`
			};
		}

		return {
			correct: false,
			result: `${socket.self} guessed the letter ${letter}. There is no letter ${letter} in the word.`
		};
	}

	function checkWord(word) {
		if (hangmanWord === word) {
			wordUnderscores = word.split('');

			// Update the letters
			setWord();

			return {
				correct: true,
				result: `Congratulations ${socket.self} guessed the correct word: ${word}`
			};
		}
		return {
			correct: false,
			result: `${socket.self} guessed of the word: ${word}`,
		}
	}


});

export default io;

