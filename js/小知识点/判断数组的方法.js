const arr = [1, 2, 3];

// 1.instance of
console.log(arr instanceof Array); // true

// 2.Array.isArray
console.log(Array.isArray(arr)); // true

// 3.constructor
console.log(arr.constructor === Array); // true

// 4.Object.toString.call
console.log(Object.prototype.toString.call(arr)); // [object Array]
