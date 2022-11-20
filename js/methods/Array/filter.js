/**
 * 
 * @param {*} callback 传入的回调函数
 * @returns 返回过滤后的数组
 */
Array.prototype.my_filter = function (callback) {
	let res = [];
	for (let i = 0; i < this.length; i++) {
		// if (callback(this[i], i, this)) res.push(this[i]);
		callback(this[i], i, this) && res.push(this[i]);
	}
	return res;
};

console.log([1, 2, 3, 4, 5].my_filter((item, index, arr) => item >= 3));