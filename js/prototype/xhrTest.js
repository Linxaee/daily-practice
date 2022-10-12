String.prototype.xhr = function (param) {
	let xhr = new XMLHttpRequest();
	let stringObj = this;
	xhr.open("GET", this + "?" + param, true);
	xhr.send();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			stringObj.xhrCallback(JSON.parse(xhr.responseText));
		}
	};
	return this;
};

String.prototype.xhrCallback = null;
String.prototype.setXhrCallback = function (callback) {
	this.xhrCallback = callback;
};
