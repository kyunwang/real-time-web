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
},{"./helpers":1}]},{},[2]);
