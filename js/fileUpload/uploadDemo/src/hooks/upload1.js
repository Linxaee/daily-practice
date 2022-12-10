import { ref } from "vue";
export function useUpload1() {
	const inputRef1 = ref(null);
	// 监听用户选择文件
	function handleClick1() {
		inputRef1.value.click();
	}

	function handleChange1(e) {
		// 获取用户选中文件
		console.log(inputRef1.value.files[0]);
		const file = inputRef1.value.files[0];
		if (!file) return;

		// 限制文件上传格式
	}

	return { handleClick1, handleChange1, inputRef1 };
}
