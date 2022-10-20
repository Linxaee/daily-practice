// debounce v1 基本实现
// function debounce(fn, delay) {
// 	let timer = null;
// 	const _debounce = function () {
// 		if (timer) clearTimeout(timer);
// 		setTimeout(() => {
// 			fn();
// 		}, delay);
// 	};
// 	return _debounce;
// }-

// debounce v2 this绑定
// function debounce(fn, delay) {
// 	let timer = null;
// 	const _debounce = function (...args) {
// 		if (timer) clearTimeout(timer);
// 		timer = setTimeout(() => {
// 			fn.apply(this, args);
// 		}, delay);
// 	};
// 	return _debounce;
// }

// debounce v3 立即执行
// function debounce(fn, delay, immediate = false) {
// 	let timer = null;
// 	let isInvoke = false;
// 	const _debounce = function (...args) {
// 		if (timer) clearTimeout(timer);
// 		// 判断是否需要立即执行
// 		if (immediate && !isInvoke) {
// 			fn.apply(this, args);
// 			isInvoke = true;
// 		}
// 		// 延迟执行
// 		timer = setTimeout(() => {
// 			fn.apply(this, args);
// 			isInvoke = false;
// 		}, delay);
// 	};
// 	return _debounce;
// }

// debounce v4 可取消
function debounce(fn, delay, immediate = false) {
	let timer = null;
	let isInvoke = false;
	const _debounce = function (...args) {
		if (timer) clearTimeout(timer);
		// 判断是否需要立即执行
		if (immediate && !isInvoke) {
			fn.apply(this, args);
			isInvoke = true;
		}
		// 延迟执行
		timer = setTimeout(() => {
			fn.apply(this, args);
			isInvoke = false;
		}, delay);
	};
	_debounce.cancel = function () {
		if (timer) clearTimeout(timer);
		timer = null;
		isInvoke = false;
	};
	return _debounce;
}
