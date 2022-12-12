import { ref } from "vue";
import { LinRequestAppCoded } from "../request/index";
/**
 * @desc base64上传图片
 * @returns
 */
export function useUpload2() {
	const inputRef2 = ref(null);
	const fileTitle2 = ref("");
	let uploadFile = null;
	/**
	 * @desc 监听用户选择文件
	 */
	function handleClick2() {
		inputRef2.value.click();
	}

	async function handleChange2() {
		// 限制文件大小为2M
		const LIMIT_SIZE = 2 * 2024 * 2024;
		// 获取用户选中文件
		const file = inputRef2.value.files[0];
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
		// 正常无误，赋值等待上传
		fileTitle2.value = file.name;
		uploadFile = file;
		// 图片文件转变成base64码
		const BASE64 = await changeBASE64(uploadFile);
		// 上传文件
		upload2(BASE64);
		// console.log(BASE64);
		// console.log(inputRef2.value.files[0]);
	}
	/**
	 * @desc 上传文件
	 */
	function upload2(BASE64) {
		// 把文件传递给服务器: FormData / BASE64
		// // 构造formData
		// let formData = new FormData();
		// formData.append("file", uploadFile);
		// formData.append("filename", fileTitle2.value);
		/**
		 * @desc 发送请求
		 * @tip config中需要添加data属性再放入BASE64
		 * @tip 用encodeURIComponent对BASE64进行编码预防乱码
		 */
		LinRequestAppCoded.post("/upload_single_base64", {
			data: {
				file: encodeURIComponent(BASE64),
				filename: fileTitle2.value,
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
	/**
	 * @desc 图片转base64
	 */
	function changeBASE64(file) {
		return new Promise(resolve => {
			const fileReader = new FileReader();
			// 调用方法变成base64格式
			fileReader.readAsDataURL(file);
			fileReader.onload = ev => {
				resolve(ev.target.result);
			};
		});
	}
	function initFile() {
		uploadFile = "";
		fileTitle2.value = "";
		// 清空input文件数组的方法
		inputRef2.value.innerHTML = "";
	}
	return { handleClick2, handleChange2, upload2, inputRef2, fileTitle2 };
}
