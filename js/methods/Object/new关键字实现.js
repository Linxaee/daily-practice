/**
 *
 * @param {*} fn 通过new调用的构造器
 * @param  {...any} args 要传入构造器的参数
 * @returns
 */
function myNew(fn, ...args) {
	// TODO:创建空对象
	let obj = {};
	// TODO:绑定原型
	obj.__proto__ = fn.prototype;
	// 或者
	// let obj = Object.create(fn.prototype);
	// TODO:改变this调用,并获取返回结果
	let res = fn.apply(obj, args);
	// TODO:构造器没有返回对象则返回obj
	return typeof res === "object" ? res : obj;
}
let Parent = function (name, age) {
	this.name = name;
	this.age = age;
};
Parent.prototype.sayName = function () {
	console.log(this.name);
};
const child = myNew(Parent, "echo", 26);
child.sayName(); //'echo';
