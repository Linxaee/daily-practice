import { obj1 } from "./data.js";
function shallowClone(obj) {
	let cloneTarget = {};
	for (const key in obj) {
		cloneTarget[key] = obj[key];
	}
	return cloneTarget;
}
const obj2 = shallowClone(obj1);
obj2.name = "Linxae";
obj2.friends[0] = "555";
obj2.test.address = "xd";
// {
//     name: 'gg',
//     age: 21,
//     friends: [ '555', '2', '3' ],  <---被修改
//     test: { address: 'xd' }, <---被修改
//     say: [Function: say]
// }
console.log(obj1);
// {
//     name: 'Linxae',
//     age: 21,
//     friends: [ '555', '2', '3' ],
//     test: { address: 'xd' },
//     say: [Function: say]
// }
console.log(obj2);
