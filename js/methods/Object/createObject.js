/**
 *
 * @param {*} o 需要作为原型的对象，可以为空
 */
function createObject(o) {
	function fn() {}
	fn.prototype = o.prototype;
	return new fn();
}
