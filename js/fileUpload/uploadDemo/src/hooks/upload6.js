import { ref } from "vue";
import { LinRequestMultipart } from "../request/index";
import SparkMD5 from "spark-md5";
/**
 * @desc base64上传图片
 * @returns
 */
export function useUpload6() {
	const inputRef6 = ref(null);
	const fileTitle6 = ref("");
	let uploadFile = null;
	/**
	 * @desc 监听用户选择文件
	 */
	function handleClick6() {
		inputRef6.value.click();
	}
	const changeBuffer = file => {
		return new Promise(resolve => {
			let fileReader = new FileReader();
			fileReader.readAsArrayBuffer(file);
			fileReader.onload = ev => {
				let buffer = ev.target.result,
					spark = new SparkMD5(),
					HASH,
					suffix;
				spark.append(buffer);
				HASH = spark.end();
				suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1];
				resolve({
					buffer,
					HASH,
					suffix,
					filename: `${HASH}.${suffix}`,
				});
			};
		});
	};
	async function handleChange6() {
		// 获取用户选中文件
		const file = inputRef6.value.files[0];
		if (!file) return;
		// 已经上传的部分
		let already = [];
		let data = null;
		let { HASH, suffix } = await changeBuffer(file);

		// 获取已切片文件
		try {
			data = await LinRequestMultipart.get("/upload_already", {
				params: {
					HASH,
				},
			});
			if (data.code == 0) {
				already = data.fileList;
			}
		} catch {}
		// 实现文件切片处理
		// 最大100kb一份
		let max = 1204 * 100;
		let count = Math.ceil(file.size / max);
		let index = 0;
		// 切片集合
		let chunks = [];
		// 最大一百份切片
		if (count > 100) {
			max = Math.ceil(file.size / 100);
			count = 100;
		}
		if (count === already.length) {
			LinRequestMultipart.post("/upload_merge", {
				data: {
					HASH,
					count,
				},
			}).then(res => {
				console.log("合并成功");
			});
			return;
		}
		while (index < count) {
			chunks.push({
				file: file.slice(index * max, (index + 1) * max),
				filename: `${HASH}_${index + 1}.${suffix}`,
			});
			index++;
		}
		index = already.length;
		const complete = res => {
			// 管控进度
			index++;
			console.log(res, index);
			// 当所有都上传成功,合并切片
			if (index >= count) {
				LinRequestMultipart.post("/upload_merge", {
					data: {
						HASH,
						count,
					},
				}).then(res => {
					console.log("合并成功");
				});
				return;
			}
		};

		chunks.forEach(chunk => {
			if (already.length > 0 && already.includes(chunk.filename)) {
				// 执行进度管控
				return;
			}
			let fm = new FormData();
			fm.append("file", chunk.file);
			fm.append("filename", chunk.filename);
			LinRequestMultipart.post("/upload_chunk", { data: fm, timeout: 6666666 }).then(complete);
		});
	}
	/**
	 * @desc 上传文件
	 */
	function upload6(BASE64) {
		// 把文件传递给服务器: FormData / BASE64
		// // 构造formData
		// let formData = new FormData();
		// formData.append("file", uploadFile);
		// formData.append("filename", fileTitle6.value);
		/**
		 * @desc 发送请求
		 * @tip config中需要添加data属性再放入BASE64
		 * @tip 用encodeURIComponent对BASE64进行编码预防乱码
		 */
		LinRequestAppCoded.post("/upload_single_base64", {
			data: {
				file: encodeURIComponent(BASE64),
				filename: fileTitle6.value,
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
		fileTitle6.value = "";
		// 清空input文件数组的方法
		inputRef6.value.innerHTML = "";
	}
	return { handleClick6, handleChange6, upload6, inputRef6, fileTitle6 };
}
