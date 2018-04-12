(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
exports.$ = function(element) {
	return document.querySelector(element);
};

exports.$$ = function(element) {
	return document.querySelectorAll(element);
};

exports.createNode = function (element = 'li', text = '') {
	const node = document.createElement(element);
	const textNode = document.createTextNode(text);
	node.appendChild(textNode);
	return node;
}

exports.searchLetter = (word, letter) => {
	const locations = [];

	for (let index = 0; index < word.length; index++) {
		if (word[index] === letter) locations.push(index);
	}

	return locations;
}
},{}],2:[function(require,module,exports){
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

			socket.emit('set word');
			
			socket.on('new message', msg => {
				chat.addMessage(msg);
			});

			socket.on('new user', msg => {
				chat.addMessage(msg);
			});

			socket.on('guess_letter', hangmanSocket.handleGuess);
			
			socket.on('guess_word', hangmanSocket.handleGuess);
		}
	}



	const hangmanSocket = {
		init: function() {
			// Get the word from the server and set it in the client
			socket.on('set word', (word, hiddenWord) => {
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
				chat.addMessage(guess.result);
			} else {
				chat.addMessage(guess.result);
			}
		}

	}

	chat.init();
})()
},{"./helpers":1}]},{},[2]);
