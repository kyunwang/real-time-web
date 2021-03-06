const h = require('./helpers');
const $ = h.$;
// const $$ = h.$$;
const createNode = h.createNode;

(function () {
	const socket = io();

	const chat = {
		init: function () {
			const self = this;

			// Add a submit event to the submit button
			$('#chat-form').addEventListener('submit', evt => {
				// Prevent default first 
				evt.preventDefault();
				const message = $('#message');
				
				socket.emit('new_message', message.value);
				
				if (!message.value.toLowerCase().startsWith('/hangman', 0)) {
					// Set own message
					chat.addMessage({ username: 'me', msg: message.value, className:'room__message--own' });
				}
				
				message.value = '';
				
				return false;
			});

			// Set username
			$('#form-modal').addEventListener('submit', evt => {
				const username = $('#input-username');
				if (!username.value) {
					evt.preventDefault();
					return;
				}

				chat.addMessage({
					username: 'SYSTEM',
					msg: 'type `/hangman <letter>` to guess a letter. type `/hangman word <your word>` to guess a word'
				});

				$('#modal').classList.remove('modal--active');

				socket.emit('set_self', username.value);

				username.value = '';

				$('#message').focus();
				evt.preventDefault();
				return false;
			})

			chatSockets.init();
		},
		addMessage: function (data) {
			// Append the new_message to the view
			
			$('#messages')
				.appendChild(createNode('li', `${data.username}: ${data.msg}`, data.className));
		},
		userEntered: function(name) {
			console.log('New user ', name);
			
		}
	}



	const chatSockets = {
		init: function() {
			hangmanSocket.init();

			socket.emit('set_word');
			socket.emit('set_letter_board');
			
			socket.on('set_self', chat.userEntered);

			socket.on('new_user', chat.addMessage);

			socket.on('user_left', chat.addMessage);
			
			socket.on('new_message', chat.addMessage);

			socket.on('guess_letter', hangmanSocket.handleGuess);
			
			socket.on('guess_word', hangmanSocket.handleGuess);
		}
	}



	const hangmanSocket = {
		init: function() {
			// Get the word from the server and set it in the client
			socket.on('set_word', hangmanSocket.setWord);
			socket.on('set_letter_board', hangmanSocket.setLetterBoard);
		},
		setWord: function(hiddenWord) {
			const wordCon = $('#word--con');
			
			// Remove current nodes for now to update
			while (wordCon.hasChildNodes()) {
				wordCon.removeChild(wordCon.lastChild);
			}

			// Render the (new)letter to the view
			hiddenWord.forEach(letter => {
				const space = createNode('span', letter);
				wordCon.appendChild(space);
			});
		},
		setLetterBoard: function(alphabet) {
			const letterCon = $('#letter--con');
			
			// Remove current nodes for now to update
			while (letterCon.hasChildNodes()) {
				letterCon.removeChild(letterCon.lastChild);
			}

			// Render the (new)letter to the view
			alphabet.forEach(letter => {
				const space = createNode('span', letter);
				// console.log(space);
				
				letterCon.appendChild(space);
			});
		},
		handleGuess: function(data) {
			console.log(data);
			
			if (data.guess.correct) {
				// chat.addMessage(guess.result);
			} else {
				chat.addMessage({
					username: data.username,
					msg: data.guess.result
				});
			}
		}

	}

	chat.init();
})()