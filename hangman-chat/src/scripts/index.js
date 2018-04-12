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
				socket.emit('new_message', $('#m').value);
				
				$('#m').value = '';
				evt.preventDefault();
				return false;
			});

			chatSockets.init();
		},
		addMessage: function (msg) {
			// Append the new_message to the view
			$('#messages')
				.appendChild(createNode('li', msg));
		},
		userEntered: function() {

		}
	}



	const chatSockets = {
		init: function() {
			hangmanSocket.init();

			socket.emit('set_word');
			
			socket.on('new_message', msg => {
				chat.addMessage(msg);
			});

			socket.on('new_user', msg => {
				chat.addMessage(msg);
			});

			socket.on('guess_letter', hangmanSocket.handleGuess);
			
			socket.on('guess_word', hangmanSocket.handleGuess);
		}
	}



	const hangmanSocket = {
		init: function() {
			// Get the word from the server and set it in the client
			socket.on('set_word', (word, hiddenWord) => {

				console.log(word, hiddenWord);
				
				const wordCon = $('#word');
				
				// Remove current nodes for now to update
				while (wordCon.hasChildNodes()) {
					wordCon.removeChild(wordCon.lastChild);
			  	}

				// Render the (new)letter to the view
				hiddenWord.forEach(letter => {
					const space = createNode('span', letter);
					wordCon.appendChild(space);
				});
			});
		},
		handleGuess: function(guess) {
			if (guess.correct) {
				// chat.addMessage(guess.result);
			} else {
				chat.addMessage(guess.result);
			}
		}

	}

	chat.init();
})()