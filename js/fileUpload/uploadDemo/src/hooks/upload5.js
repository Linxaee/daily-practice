import { ref } from "vue";
import { LinRequestMultipart } from "../request/index";
export function useUpload5() {
	const inputRef5 = ref(null);
	const fileTitle5 = ref("");
	const uploadFiles = ref([]);

	/**
	 * @desc 监听用户选择文件
	 */
	function handleClick5() {
		inputRef5.value.click();
	}

	function handleChange5() {
		// 限制文件大小为2M
		const LIMIT_SIZE = 2 * 5024 * 5024;
		// 获取用户选中文件(结构类数组)
		uploadFiles.value = [...inputRef5.value.files];
		if (uploadFiles.length) return;
		uploadFiles.value = uploadFiles.value.map(file => {
			return {
				file,
				fileName: file.name,
				progress: 0,
			};
		});
	}
	/**
	 * @desc 移除文件
	 */
	function removeFile5(index) {
		uploadFiles.value.splice(index, 1);
	}
	/**
	 * @desc 上传文件
	 */
	function upload5() {
		if (uploadFiles.length === 0) {
			console.log("请先选择上传的文件");
			return;
		}

		const uploads = uploadFiles.value.map(file => {
			// 构造formData
			let formData = new FormData();
			formData.append("file", file.file);
			formData.append("filename", file.fileName);
			/**
			 * @desc 发送请求
			 * @tip config中需要添加data属性再放入formData
			 */
			return LinRequestMultipart.post("/upload_single", {
				data: formData,
				onUploadProgress: ev => {
					let { loaded, total } = ev;
					file.progress = (loaded / total) * 100;
				},
			}).then(res => {
				if (Number(res.code === 0)) console.log(`文件${file.fileName}上传成功`);
				else Promise.reject(res);
			});
		});
		console.log(uploads);
		Promise.all(uploads);
	}

	function initFile() {
		uploadFiles.value = "";
		fileTitle5.value = "";
		// 清空input文件数组的方法
		inputRef5.value.innerHTML = "";
	}
	return { handleClick5, handleChange5, removeFile5, upload5, inputRef5, uploadFiles };
}
