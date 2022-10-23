/**
 *name:promise手写练习
 *time:2022/10/16
 */
PROMISE_STATE_PENDING = "pending";
PROMISE_STATE_FULFILLED = "fulfilled";
PROMISE_STATE_REJECTED = "rejected";

function executeFnWithCatchErr(Fn, param, resolve, reject) {
	try {
		const res = Fn(param);
		resolvePromise(resolve, reject, res);
	} catch (err) {
		reject(err);
	}
}
// 处理回调函数的返回值，若是promise对象则返回then后的结果，普通值则直接返回
function resolvePromise(resolve, reject, target) {
	// 判断是否是对象或者函数
	if (
		(typeof target == "function" && target !== null) ||
		typeof target === "object"
	) {
		let called = false;
		try {
			const then = target.then;
			if (typeof then !== "function") {
				resolve(target);
			} else {
				then.call(
					target,
					(res) => {
						if (called) return;
						called = true;
						resolvePromise(resolve, reject, res);
					},
					(err) => {
						if (called) return;
						called = true;
						reject(err);
					}
				);
			}
		} catch (err) {
			if (called) return;
			called = true;
			reject(err);
		}
	} else {
		resolve(target);
	}
}
class GGPromise {
	constructor(executor) {
		this.status = PROMISE_STATE_PENDING;
		this.value = undefined;
		this.reason = undefined;

		this.onFulfilledCallbacks = [];
		this.onRejectedCallbacks = [];
		const resolve = (value) => {
			queueMicrotask(() => {
				if (this.status !== PROMISE_STATE_PENDING) return;
				this.status = PROMISE_STATE_FULFILLED;
				this.value = value;
				executeCallbacks(this.onFulfilledCallbacks, this.value);
			});
		};
		const reject = (reason) => {
			queueMicrotask(() => {
				if (this.status !== PROMISE_STATE_PENDING) return;
				this.status = PROMISE_STATE_REJECTED;
				this.reason = reason;
				executeCallbacks(this.onRejectedCallbacks, this.reason);
			});
		};
		const executeCallbacks = (callbacks, param) => {
			callbacks.forEach((callback) => {
				callback(param);
			});
		};
		try {
			executor(resolve, reject);
		} catch (err) {
			reject(err);
		}
	}
	then(onFulfilled, onRejected) {
		onRejected =
			onRejected ||
			function (err) {
				throw err;
			};
		onFulfilled =
			onFulfilled ||
			function (res) {
				return res;
			};
		return new GGPromise((resolve, reject) => {
			if (this.status === PROMISE_STATE_FULFILLED && onFulfilled) {
				// try {
				// 	let value = onFulfilled(this.value);
				// 	resolve(value);
				// } catch (err) {
				// 	reject(err);
				// }
				executeFnWithCatchErr(onFulfilled, this.value, resolve, reject);
			}
			if (this.status === PROMISE_STATE_REJECTED && onRejected) {
				executeFnWithCatchErr(onRejected, this.reason, resolve, reject);
			}
			if (this.status === PROMISE_STATE_PENDING) {
				this.onFulfilledCallbacks.push(() => {
					executeFnWithCatchErr(
						onFulfilled,
						this.value,
						resolve,
						reject
					);
				});
				this.onRejectedCallbacks.push(() => {
					executeFnWithCatchErr(
						onRejected,
						this.reason,
						resolve,
						reject
					);
				});
				// 链式调用上一次promise的结果要是下一次的开始
				// this.onFulfilledCallbacks.push((onFulfilled));
				// this.onRejectedCallbacks.push(onRejected);
			}
		});
	}
	catch(onRejected) {
		return this.then(undefined, onRejected);
	}
	finally(onFinally) {
		this.then(onFinally, onFinally);
	}
	static resolve(value) {
		return new GGPromise((resolve, reject) => {
			resolve(value);
		});
	}
	static reject(reason) {
		return new GGPromise((resolve, reject) => {
			reject(reason);
		});
	}
	static all(promises) {
		return new Promise((resolve, reject) => {
			let results = [];
			promises.forEach((promise) => {
				promise
					.then((res) => {
						results.push(res);
					})
					.catch((err) => {
						reject(err);
					})
					.finally(() => {
						if (promises.length === results.length) {
							resolve(results);
						}
					});
			});
		});
	}
	static race(promises) {
		return new Promise((resolve, reject) => {
			promises.forEach((promise) => {
				promise
					.then((res) => {
						resolve(res);
					})
					.catch((err) => {
						reject(err);
					});
			});
		});
	}
	static allSettled(promises) {
		return new Promise((resolve, reject) => {
			let results = [];
			promises.forEach((promise) => {
				// 不改变原顺序
				let index = promises.indexOf(promise);
				promise
					.then((res) => {
						results[index] = {
							status: PROMISE_STATE_FULFILLED,
							value: res,
						};
					})
					.catch((err) => {
						results[index] = {
							status: PROMISE_STATE_REJECTED,
							reason: err,
						};
					})
					.finally(() => {
						if (promises.length === results.length) {
							resolve(results);
						}
					});
			});
		});
	}
}

// const promise = new GGPromise((resolve, reject) => {
// 	// resolve(666);
// 	reject(456);
// });
// promise
// 	.then((res) => {
// 		console.log("res:", res);
// 	})
// 	.catch((err) => {
// 		console.log("err:", err);
// 	})
// 	.finally(() => {
// 		console.log("finally");
// 	});
// GGPromise.resolve(123).then((res) => {
// 	console.log("res", res);
// });
let p1 = new GGPromise((resolve, reject) => {
	setTimeout(() => {
		resolve("p1");
	}, 2000);
});
let p2 = new GGPromise((resolve, reject) => {
	setTimeout(() => {
		reject("p2");
	}, 1000);
});
let p3 = new GGPromise((resolve, reject) => {
	setTimeout(() => {
		resolve("p3");
	}, 3000);
});
GGPromise.allSettled([p1, p2, p3])
	.then((res) => {
		console.log("resgg", res);
	})
	.catch((err) => {
		console.log("errgg", err);
	});
Promise.allSettled([p1, p2, p3])
	.then((res) => {
		console.log("res", res);
	})
	.catch((err) => {
		console.log("err", err);
	});
