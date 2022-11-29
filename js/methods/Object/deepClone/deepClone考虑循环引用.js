import { obj2 } from "./data.js";
// 自身引用赋值
obj2.temp = obj2;
function deepClonePre(obj) {
	if (typeof obj === "object") {
		let cloneTarget = Array.isArray(obj) ? [] : {};
		for (const key in obj) {
			cloneTarget[key] = deepClonePre(obj[key]);
		}
		return cloneTarget;
	} else {
		return obj;
	}
}

function deepClone(obj, map = new Map()) {
	if (typeof obj === "object") {
		let cloneTarget = Array.isArray(obj) ? [] : {};

		if (map.has(obj)) return map.get(obj);
		map.set(obj, cloneTarget);

		for (const key in obj) {
			let res = deepClone(obj[key], map);
			cloneTarget[key] = res;
		}
		return cloneTarget;
	} else {
		return obj;
	}
}
console.log(obj2); // 正常打印，无限展开
// console.log(deepClonePre(obj2)); // 爆栈
console.log(deepClone(obj2)); // 正常打印
