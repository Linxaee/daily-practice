// 全局变量临时存储需要调用的函数
let reactiveFn = null;
let targetMap = new WeakMap();
// 依赖类
class Depend {
	constructor() {
		this.reactiveFns = new Set();
	}
	depend() {
		// notify的时候也会触发set，随后触发depend()此时，reactiveFn为null，所以不能加入set
		if (reactiveFn) {
			this.reactiveFns.add(reactiveFn);
		}
	}
	notify() {
		this.reactiveFns.forEach((fn) => {
			fn();
		});
	}
}
// 封装获取依赖函数
function getDepend(target, key) {
	// 获取目标对象的依赖map
	let map = targetMap.get(target);
	if (!map) {
		map = new Map();
		targetMap.set(target, map);
	}
	// 获取目标属性的依赖对象
	let depend = map.get(key);
	if (!depend) {
		depend = new Depend();
		map.set(key, depend);
	}
	return depend;
}
// 封装响应式函数
function myReactive(obj) {
	return new Proxy(obj, {
		get: function (target, key, receiver) {
			const depend = getDepend(target, key);
			// 添加依赖
			depend.depend();
			return Reflect.get(target, key, receiver);
		},
		set: function (target, key, newValue, receiver) {
			Reflect.set(target, key, newValue, receiver);
			const depend = getDepend(target, key);
			// 添加依赖
			depend.notify();
		},
	});
}

// 添加依赖函数
function watchFn(fn) {
	reactiveFn = fn;
	fn();
	reactiveFn = null;
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
