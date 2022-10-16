/**
 *
 *
 */
PROMISE_STATE_PENDING = "pending";
PROMISE_STATE_FULFILLED = "fulfilled";
PROMISE_STATE_REJECTED = "rejected";

function executeFnWithCatchErr(Fn, param, resolve, reject) {
	try {
		const res = Fn(param);
		resolve(res);
	} catch (err) {
		reject(err);
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
			}
		});
	}
}

const promise = new GGPromise((resolve, reject) => {
	reject(666);
});
promise
	.then(
		(res) => {
			console.log("res:", res);
			throw new Error("gg!");
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
