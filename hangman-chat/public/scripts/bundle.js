(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
exports.$ = function(element) {
	return document.querySelector(element);
};

exports.$$ = function(element) {
	return document.querySelectorAll(element);
};
},{}],2:[function(require,module,exports){
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
		}
	}

	const chatSockets = {
		init: function() {
			hangmanSocket.init();

			socket.emit('get word');
			
			socket.on('new message', function (msg) {
				chat.addMessage(msg);
			});

		}
	}

	const hangmanSocket = {
		init: function() {
			socket.on('get word', function(word) {
				console.log(word);
				$('#word').textContent = word;
			});
		}
	}

	chat.init();
})()
},{"./helpers":1}]},{},[2]);
