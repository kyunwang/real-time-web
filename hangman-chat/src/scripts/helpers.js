exports.$ = function(element) {
	return document.querySelector(element);
};

exports.$$ = function(element) {
	return document.querySelectorAll(element);
};