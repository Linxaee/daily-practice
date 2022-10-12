// class Person {
// 	constructor(name, age) {
// 		this.name = name;
// 		this.age = age;
// 	}
// 	eating() {
// 		console.log("eating");
// 	}

// 	running() {
// 		console.log("running");
// 	}
// 	static staticMethod() {
// 		console.log("static");
// 	}
// }

// class Student extends Person {
// 	constructor(name, age, id) {
// 		super(name, age);
// 		this.id = id;
// 	}
// }
// const p = new Person("gg", 18);
// const s = new Student("aaa", 20, "114");
// console.log("s.name", s.name);
// s.running();

function Person(name, age) {
	this.name = name;
	this.age = age;
}
Person.prototype.eating = function () {
	console.log("eating");
};
Person.prototype.running = function () {
	console.log("running");
};

function createObject(o) {
	function fn() {}
	fn.prototype = o;
	return new fn();
}

function Student(name, age, id) {
	Person.call(this, name, age);
	this.id = id;
}
Student.prototype = createObject(Person.prototype);
const s = new Student("gg", 21, 1234);
s.eating();
s.running();
console.log("s.name", s.name);
console.log("s.id", s.id);
