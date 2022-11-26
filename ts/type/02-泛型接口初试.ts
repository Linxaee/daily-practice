// 1.返回值是一个对象，里面有多种类型并需要对其进行限制
interface fooReturn<T, U> {
	value: T;
	msg: U;
}
function foo<T, U>(value: T, msg: U): fooReturn<T, U> {
	console.log("value:" + value + " type:" + typeof value);
	console.log("msg:" + msg + " type:" + typeof msg);
	return { value, msg };
}

/**
 * value:false type:boolean
 * msg:my msg type:string
 * { value: 'my value', msg: 'my msg' }
 */
console.log(foo(false, "my msg"));
