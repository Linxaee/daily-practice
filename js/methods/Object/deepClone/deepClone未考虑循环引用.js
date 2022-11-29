import { obj1 } from "./data.js";
function deepClone(obj) {
	// 判断是否为对象
	if (typeof obj === "object") {
		// 处理为数组的情况
		let targetObj = Array.isArray(obj) ? [] : {};
		for (const key in obj) {
			// 递归处理为对象的值
			targetObj[key] = deepClone(obj[key]);
		}
		return targetObj;
	} else {
		// 不为对象则直接返回
		return obj;
	}
}

const obj2 = deepClone(obj1);
obj2.friends[0] = "555";
obj2.test.address = "xd";
// {
//     name: 'gg',
//     age: 21,
//     friends: [ '1', '2', '3' ],
//     test: { address: 'cxd' },
//     say: [Function: say]
// }
console.log(obj1);
// {
//     name: 'gg',
//     age: 21,
//     friends: [ '555', '2', '3' ],
//     test: { address: 'xd' },
//     say: [Function: say]
// }
console.log(obj2);
