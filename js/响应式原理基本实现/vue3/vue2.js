/**
 * vue响应式基本原理,vue2 defineProperty
 * 2022/10/23
 */
// 全局依赖函数
let reactiveFn = null;
// weakMap
let targetMap = new WeakMap();
//依赖类
class Depend {
	constructor() {
		this.reactiveFns = new Set();
	}
	depend() {
		if (reactiveFn) this.reactiveFns.add(reactiveFn);
	}
	notify() {
		this.reactiveFns.forEach((fn) => {
			fn();
		});
	}
}
//注册函数
function watchFn(fn) {
	reactiveFn = fn;
	// 调用函数触发Proxy get
	fn();
	reactiveFn = null;
}
// 获取依赖
function getDepend(target, key) {
	let map = targetMap.get(target);
	// 每一个对象对应一个Map，Map以该对象属性为key，对应的depend类为值，每一个depend类维护一个set存储依赖函数
	if (!map) {
		map = new Map();
		targetMap.set(target, map);
	}
	let depend = map.get(key);
	if (!depend) {
		depend = new Depend();
		map.set(key, depend);
	}
	return depend;
}
// 对象添加响应式
function myReactive(obj) {
	Object.keys(obj).forEach((key) => {
		let value = obj[key];
		Object.defineProperty(obj, key, {
			get: function () {
				const depend = getDepend(obj, key);
				depend.depend();
				return value;
			},
			set: function (newValue) {
				value = newValue;
				const depend = getDepend(obj, key);
				depend.notify();
			},
		});
	});
	console.log("obj", obj);
	return obj;
}

// 测试数据
let obj = myReactive({
	name: "gg",
	age: 18,
});

watchFn(function () {
	console.log("姓名：", obj.name);
});
watchFn(function () {
	console.log("年龄：", obj.age);
});
watchFn(function () {
	console.log(`我是${obj.name},今年${obj.age}`);
});

// obj.name = "cc";
obj.age = 21;
