exports.$ = function(element) {
	return document.querySelector(element);
};

exports.$$ = function(element) {
	return document.querySelectorAll(element);
};

exports.createNode = function (element = 'li', text = '', className) {
	const node = document.createElement(element);
	const textNode = document.createTextNode(text);
	node.appendChild(textNode);

	console.log(className);
	
	if (className) {
		node.classList.add(className);
	}

	return node;
}

exports.searchLetter = (array, letter) => {
	const locations = [];

	for (let index = 0; index < array.length; index++) {
		if (array[index] === letter) locations.push(index);
	}

	return locations;
}