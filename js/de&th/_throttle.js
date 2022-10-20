//v1
function throttle(fn, interval) {
	let lastTime = 0;
	const _throttle = function (...args) {
		let nowTime = new Date().getTime();
		if (interval - (nowTime - lastTime) <= 0) {
			fn.apply(this, args);
			lastTime = nowTime;
		}
	};
	return _throttle;
}
