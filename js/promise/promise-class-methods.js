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
}

const promise = new GGPromise((resolve, reject) => {
	resolve(666);
});
promise
	.then(
		(res) => {
			console.log("res:", res);
			return new GGPromise((resolve, reject) => {
				resolve("return的promise");
			});
		},
		(err) => {
			console.log("err:", err);
			return 555;
		}
	)
	.then(
		(res) => {
			console.log("res2:", res);
		},
		(err) => {
			console.log("err2:", err);
		}
	);
promise.then(
	(res) => {
		console.log("res3:", res);
	},
	(err) => {
		console.log("err3:", err);
	}
);
