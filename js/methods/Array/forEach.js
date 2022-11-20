/**
 *
 * @param {*} callback 传入的回调函数
 * 取出每一个元素遍历
 */
Array.prototype.my_forEach = function (callback) {
	for (let i = 0; i < this.length; i++) {
		callback(this[i], i, this);
	}
};

[1, 2, 3, 4, 5].my_forEach((item, index, arr) => {
	console.log(item, index, arr);
});
