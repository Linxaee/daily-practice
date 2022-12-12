import { ref } from "vue";
import { LinRequestMultipart } from "../request/index";
/**
 * @desc 上传图片
 * @returns
 */
export function useUpload4() {
	const inputRef4 = ref(null);
	const fileTitle4 = ref("");
	let progress4 = ref(0);
	let uploadFile = null;
	/**
	 * @desc 监听用户选择文件
	 */
	function handleClick4() {
		inputRef4.value.click();
	}

	async function handleChange4() {
		// 限制文件大小为2M
		const LIMIT_SIZE = 2 * 1024 * 1024;
		// 获取用户选中文件
		const file = inputRef4.value.files[0];
		if (!file) return;

		// 限制上传大小
		// if (file.size > LIMIT_SIZE) {
		// 	console.log("上传文件应小于2M");
		// 	return;
		// }
		// 正常无误，赋值等待上传
		fileTitle4.value = file.name;
		uploadFile = file;
		upload4();
		// 上传文件
		// console.log();
		// console.log(inputRef2.value.files[0]);
	}
	/**
	 * @desc 上传文件
	 */
	function upload4() {
		// 把文件传递给服务器: FormData /
		// 构造formData
		let formData = new FormData();
		formData.append("file", uploadFile);
		formData.append("filename", fileTitle4.value);
		/**
		 * @desc 发送请求
		 * @tip config中需要添加data属性再放入
		 * @tip 用encodeURIComponent对进行编码预防乱码
		 */
		LinRequestMultipart.post("/upload_single", {
			data: formData,
			onUploadProgress: ev => {
				let { loaded, total } = ev;
				progress4.value = loaded / total;
			},
		})
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
		fileTitle4.value = "";
		// 清空input文件数组的方法
		inputRef4.value.innerHTML = "";
	}
	return { handleClick4, handleChange4, upload4, inputRef4, fileTitle4, progress4 };
}
