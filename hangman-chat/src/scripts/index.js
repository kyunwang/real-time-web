const h = require('./helpers');
const $ = h.$;
// const $$ = h.$$;

(function () {
	const socket = io();

	const testWord = 'wonderful';

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
				.appendChild(this.createMessage('li', msg));
		},
		createMessage: function (element = 'li', msg = '') {
			const node = document.createElement(element);
			const message = document.createTextNode(msg);
			node.appendChild(message);
			return node;
		},
		userEntered: function() {

		}
	}

	const chatSockets = {
		init: function() {
			hangmanSocket.init();

			socket.emit('get word');
			
			socket.on('new message', function (msg) {
				chat.addMessage(msg);
			});


			socket.on('new user', function (msg) {
				chat.addMessage(msg);
			});


		}
	}

	const hangmanSocket = {
		init: function() {
			// Get the word from the server and set it in the client
			socket.on('get word', function(word) {
				console.log(word);
				$('#word').textContent = word;
			});
		}
	}

	chat.init();
})()