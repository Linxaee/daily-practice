import { customRef } from "vue";

export default function (value) {
	return customRef((track, trigger) => {
		let timer = null;
		return {
			get() {
				// 收集依赖
				track();
				return value;
			},
			set(newValue) {
				if (timer) clearTimeout(timer);
				timer = setTimeout(() => {
					console.log("一秒后~~");
					value = newValue;
					trigger();
				}, 1000);
			},
		};
	});
}
