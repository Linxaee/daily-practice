function shallowClone(obj: Record<string, any>) {
	if (typeof obj === "object") {
		let cloneTarget: Record<string, any> | any[] = Array.isArray(obj) ? [] : {};
		for (const key in obj) {
			cloneTarget[key] = shallowClone(obj[key]);
			console.log(key);
		}
		return cloneTarget;
	} else {
		// 非引用类型则返回本身
		return obj;
	}
}
