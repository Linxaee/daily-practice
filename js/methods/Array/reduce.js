/**
 *
 * @param {*} callback 传入的回调函数
 * @param  {...any} args 初始值
 * @returns 返回上一次的值
 */
Array.prototype.my_reduce = function (callback, ...args) {
	let [start, pre] = args.length ? [0, args[0]] : [1, this[0]];
	for (let i = start; i < this.length; i++) {
		pre = callback(pre, this[i], i, this);
	}
	return pre;
};
/**
 * flat方法测试reduce
 * @param {*} deepNum 展开层数
 * @returns 返回当前层连接后的数组
 */
Array.prototype.myFlat = function (deepNum = 1) {
	if (deepNum <= 0) return this;
	return this.my_reduce((total, value) => {
		if (Array.isArray(value)) {
			return total.concat(value.myFlat(deepNum - 1));
		} else {
			return total.concat(value);
		}
	}, []);
};

let arr = [1, 2, 3, 4, 5];

let arr2 = [1, [[2, [3, 4]], 5, 6], 7, [[8, 9], 10, 11]];

console.log(arr2.myFlat()); // [ 1, [ 2, [ 3, 4 ] ], 5, 6, 7, [ 8, 9 ], 10, 11 ]

console.log(
	arr.my_reduce((prev, next) => {
		return prev + next;
	}, 2)
); // 17

console.log(
	arr.reduce((prev, next) => {
		return prev + next;
	})
); // 15
