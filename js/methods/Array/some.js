/**
 * 对数组中每个元素进行判断，有一个满足条件的项则返回true
 * @param {*} callback 传入的回调函数
 * @returns 遍历操作后的数组
 */
Array.prototype.my_some = function (callback) {
	for (let i = 0; i < this.length; i++) {
		if (callback(this[i], i, this)) return true;
	}
	return false;
};

let arr = [1, 2, 3, 4, 5];

console.log(arr.my_some((item, index, arr) => item < 2)); //true
console.log(arr.my_some((item, index, arr) => item < 0)); //false
