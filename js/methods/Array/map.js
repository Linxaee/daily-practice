/**
 *
 * @param {*} callback 传入的回调函数
 * @returns 遍历操作后的数组
 */
Array.prototype.my_map = function (callback) {
	// 不操作原数组，返回遍历操作后的新数组
	let res = [];
	for (let i = 0; i < this.length; i++) {
		res.push(callback(this[i], i, this));
	}
	return res;
};

let arr = [1, 2, 3, 4, 5];

console.log(arr.my_map((item, index, arr) => item + 1));
