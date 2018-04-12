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
				socket.emit('new message', $('#m').value);
				
				$('#m').value = '';
				evt.preventDefault();
				return false;
			});

			chatSockets.init();
		},
		addMessage: function (msg) {
			// Append the new message to the view
			$('#messages')
				.appendChild(createNode('li', msg));
		},
		userEntered: function() {

		}
	}

	const chatSockets = {
		init: function() {
			hangmanSocket.init();

			socket.emit('get word');
			
			socket.on('new message', msg => {
				chat.addMessage(msg);
			});

			socket.on('new user', msg => {
				chat.addMessage(msg);
			});

			socket.on('guess_letter', letter => {
				console.log('guess', letter);
			});
			
			socket.on('guess_word', word => {
				console.log('guess', word);
				
			});
		}
	}

	const hangmanSocket = {
		init: function() {
			// Get the word from the server and set it in the client
			socket.on('get word', (word, hiddenWord) => {
				console.log(word, hiddenWord);
				const wordCon = $('#word');
				const spaces = hiddenWord.forEach(letter => {
					const space = createNode('span', letter);
					console.log(wordCon, space);
					wordCon.appendChild(space);
				});
				

				// $('#word').textContent = word;
			});
		},

	}

	chat.init();
})()