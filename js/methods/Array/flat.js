// Array.prototype.myFlat = function (deepNum = 1) {
// 	return deepNum > 0
// 		? this.reduce((total, value) => {
// 				return total.concat(
// 					Array.isArray(value) ? value.myFlat(deepNum - 1) : value
// 				);
// 		  }, [])
// 		: this;
// };
/**
 * 展开写法
 */
Array.prototype.myFlat = function (deepNum = 1) {
	if (deepNum <= 0) return this;
	return this.reduce((total, value) => {
		if (Array.isArray(value)) {
			return total.concat(value.myFlat(deepNum - 1));
		} else {
			return total.concat(value);
		}
	}, []);
};
let arr = [1, [[2, [3, 4]], 5, 6], 7, [[8, 9], 10, 11]];
console.log("arr", arr.myFlat());
