import { ref } from "vue";
import { LinRequestMultipart } from "../request/index";
export function useUpload1() {
	const inputRef1 = ref(null);
	const fileTitle = ref("");
	let uploadFile = null;
	/**
	 * @desc 监听用户选择文件
	 */
	function handleClick1() {
		inputRef1.value.click();
	}

	function handleChange1() {
		// 限制文件大小为2M
		const LIMIT_SIZE = 2 * 1024 * 1024;
		// 获取用户选中文件
		const file = inputRef1.value.files[0];
		if (!file) return;
		// 限制文件上传格式
		if (!/(PNG|JPG|JPEG)/i.test(file.type)) {
			console.log("上传文件格式不匹配");
			return;
		}
		// 限制上传大小
		if (file.size > LIMIT_SIZE) {
			console.log("上传文件应小于2M");
			return;
		}
		fileTitle.value = file.name;
		uploadFile = file;
		// console.log(inputRef1.value.files[0]);
	}
	/**
	 * @desc 移除文件
	 */
	function removeFile1() {
		initFile();
	}
	/**
	 * @desc 上传文件
	 */
	function upload1() {
		if (!uploadFile) {
			console.log("请先选择上传的文件");
			return;
		}
		// 把文件传递给服务器: FormData / BASE64
		// 构造formData
		let formData = new FormData();
		formData.append("file", uploadFile);
		formData.append("filename", fileTitle.value);
		/**
		 * @desc 发送请求
		 * @tip config中需要添加data属性再放入formData
		 */
		LinRequestMultipart.post("/upload_single", { data: formData })
			.then(
				res => {
					if (res.code === 0) {
						console.log(`文件上传成功,${res.servicePath}`);
						return;
					}
					return Promise.reject(res.codeText);
				},
				err => {
					console.log(err);
				}
			)
			.finally(() => {
				initFile();
			});
	}

	function initFile() {
		uploadFile = "";
		fileTitle.value = "";
		// 清空input文件数组的方法
		inputRef1.value.innerHTML = "";
	}
	return { handleClick1, handleChange1, removeFile1, upload1, inputRef1, fileTitle };
}
