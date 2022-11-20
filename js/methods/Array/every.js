/**
 * 对数组中每个元素进行判断，有一个不满足条件就返回false
 * @param {*} callback 传入的回调函数
 * @returns 遍历操作后的数组
 */
Array.prototype.my_every = function (callback) {
	for (let i = 0; i < this.length; i++) {
		if (!callback(this[i], i, this)) return false;
	}
	return true;
};

let arr = [1, 2, 3, 4, 5];

console.log(arr.my_every((item, index, arr) => item < 1)); //false
console.log(arr.my_every((item, index, arr) => item < 10)); //true
