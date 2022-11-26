function foo<T, U>(value: T, msg: U) {
	console.log("value:" + value + " type:" + typeof value);
	console.log("msg:" + msg + " type:" + typeof msg);
}

/**
 * value:44 type:number
 * msg:hello world type:string
 */
foo<number, string>(44, "hello world");

/**
 * value:false type:boolean
 * msg:123 type:number
 */
foo<boolean, number>(false, 123);

// 可以自动推导类型
/**
 * value:hello world type:string
 * msg:666 type:number
 */
foo("hello world", 666);
