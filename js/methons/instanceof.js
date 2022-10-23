/**
 * name:instance of实现
 */
function myInstance(src, target) {
	while (target.__proto__) {
		if (src.__proto__ === target.prototype) return true;
		target = target.__proto__;
	}
	return false;
}
class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
}
let gg = new Person("gg", 18);
console.log(myInstance("123", String)); //true
console.log(myInstance(gg, Person)); //true
console.log(myInstance(123, Number)); //true
console.log(myInstance("123", Number)); //false
