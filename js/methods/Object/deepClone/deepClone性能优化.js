/**
 * 1、用WeakMap替代map,克隆大对象时节省性能
 * 2、用While替代for...in
 *
 */
import { obj2 } from "./data.js";
// 自身引用赋值
obj2.temp = obj2;
// while封装forEach(arr,cb)
/**
 *
 * @param {*} arr 待遍历数组(数组是本身，对象则是keys)
 * @param {*} cb 回调函数
 */
function forEach(arr, cb) {
	let index = -1;
	const len = arr.length;
	while (++index < len) {
		cb(arr[index], index);
	}
	return arr;
}
function deepClone(target, map = new WeakMap()) {
	if (typeof target === "object") {
		// 判断传入的是否是数组
		const isArray = Array.isArray(target);
		let cloneTarget = isArray ? [] : {};
		// 若已经将对象和地址的键值对添加到map中，则取出直接返回
		if (map.has(target)) return map.get(target);
		map.set(target, cloneTarget);

		// 若是数组则传入数组本身
		const iterates = isArray ? undefined : Object.keys(target);
		forEach(iterates ?? target, (value, index) => {
			// 若遍历的是对象，则value是key
			if (!isArray) index = value;
			cloneTarget[index] = deepClone(target[index], map);
		});
		return cloneTarget;
	} else {
		return target;
	}
}
console.log(obj2); // 正常打印，无限展开
// console.log(deepClonePre(obj2)); // 爆栈
console.log(deepClone(obj2)); // 正常打印
