<template>
	<div>
		<div class="container">
			<div class="item">
				<h3>单一文件上传「FORM-DATA」</h3>
				<section class="upload_box" id="upload1">
					<!-- accept=".png" 限定上传文件的格式 -->
					<input
						type="file"
						class="upload_inp"
						ref="inputRef1"
						accept=".png,.jpg,.jpeg"
						@change="handleChange1"
					/>
					<div class="upload_button_box">
						<button class="upload_button select" @click="handleClick1">选择文件</button>
						<button class="upload_button upload">上传到服务器</button>
					</div>
					<div class="upload_tip">只能上传 PNG/JPG/JPEG 格式图片，且大小不能超过2MB</div>
					<ul class="upload_list">
						<!-- <li>
                        <span>文件：...</span>
                        <span><em>移除</em></span>
                    </li> -->
					</ul>
				</section>
			</div>

			<div class="item">
				<h3>单一文件上传「BASE64」，只适合图片</h3>
				<section class="upload_box" id="upload2">
					<input type="file" class="upload_inp" accept=".jpg,.jpeg,.png" />
					<div class="upload_button_box">
						<button class="upload_button select">上传图片</button>
					</div>
					<div class="upload_tip">只能上传jpg/png格式图片，且大小不能超过2mb</div>
				</section>
			</div>

			<div class="item">
				<h3>单一文件上传「缩略图处理」</h3>
				<section class="upload_box" id="upload3">
					<input type="file" class="upload_inp" accept=".jpg,.jpeg,.png" />
					<div class="upload_button_box">
						<button class="upload_button select">选择文件</button>
						<button class="upload_button upload">上传到服务器</button>
					</div>
					<div class="upload_abbre">
						<img src="" alt="" />
					</div>
				</section>
			</div>
		</div>

		<div class="container">
			<div class="item">
				<h3>单一文件上传「进度管控」</h3>
				<section class="upload_box" id="upload4">
					<input type="file" class="upload_inp" />
					<div class="upload_button_box">
						<button class="upload_button select">上传文件</button>
					</div>
					<div class="upload_progress">
						<div class="value"></div>
					</div>
				</section>
			</div>

			<div class="item">
				<h3>多文件上传</h3>
				<section class="upload_box" id="upload5">
					<input type="file" class="upload_inp" multiple />
					<div class="upload_button_box">
						<button class="upload_button select">选择文件</button>
						<button class="upload_button upload">上传到服务器</button>
					</div>
					<ul class="upload_list">
						<!-- <li key='xx'>
                        <span>文件：xxxxx</span>
                        <span><em>移除</em></span>
                    </li> -->
					</ul>
				</section>
			</div>

			<div class="item">
				<h3>拖拽上传</h3>
				<section class="upload_box" id="upload6">
					<input type="file" class="upload_inp" />
					<div class="upload_drag">
						<i class="icon"></i>
						<span class="text"
							>将文件拖到此处，或<a href="javascript:;" class="upload_submit">点击上传</a></span
						>
					</div>
					<div class="upload_mark">正在上传中，请稍等...</div>
				</section>
			</div>
		</div>

		<div class="container">
			<div class="item">
				<h3>大文件上传</h3>
				<section class="upload_box" id="upload7">
					<input type="file" class="upload_inp" />
					<div class="upload_button_box">
						<button class="upload_button select">上传图片</button>
					</div>
					<div class="upload_progress">
						<div class="value"></div>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>

<script setup>
import { LinRequestMultipart, LinRequestAppCoded, LinRequestAppJson } from "../src/request";
import { useUpload1 } from "./hooks/upload1";
const { handleClick1, handleChange1, inputRef1 } = useUpload1();
// 监听用户选择文件
</script>

<style scoped>
html,
body {
	overflow-x: hidden;
}

.container {
	padding: 20px 100px;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}

.container .item h3 {
	line-height: 40px;
}
.upload_box {
	position: relative;
	box-sizing: border-box;
	padding: 10px;
	width: 400px;
	min-height: 150px;
	border: 1px dashed #ddd;
}

.upload_box .upload_inp {
	display: none;
}

.upload_box .upload_button {
	position: relative;
	box-sizing: border-box;
	margin-right: 10px;
	padding: 0 10px;
	min-width: 80px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	border: none;
	cursor: pointer;
	background-color: #ddd;
	overflow: hidden;
}

.upload_box .upload_button:after {
	position: absolute;
	top: 30px;
	left: 0;
	z-index: 999;
	transition: top 0.1s;
	box-sizing: border-box;
	padding-left: 25px;
	width: 100%;
	height: 100%;
	content: "loading...";
	text-align: left;
	background: url("./assets/img/loading.gif") no-repeat 5px center #eee;
	background-size: 15px 15px;
	color: #999;
}

.upload_box .upload_button.loading {
	cursor: inherit;
}

.upload_box .upload_button.loading:after {
	top: 0;
}

.upload_box .upload_button.select {
	background: #409eff;
	color: #fff;
}

.upload_box .upload_button.upload {
	background: #67c23a;
	color: #fff;
}

.upload_box .upload_button.disable {
	background: #eee;
	color: #999;
	cursor: inherit;
}

.upload_box .upload_tip {
	margin-top: 10px;
	line-height: 25px;
	color: #999;
	font-size: 12px;
}

.upload_box .upload_list,
.upload_box .upload_abbre,
.upload_box .upload_progress,
.upload_box .upload_mark {
	display: none;
}

.upload_box .upload_list {
	margin-top: 10px;
}

.upload_box .upload_list li {
	line-height: 25px;
	font-size: 0;
}

.upload_box .upload_list li span {
	display: inline-block;
	margin-right: 10px;
	max-width: 70%;
	color: #999;
	font-size: 12px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}

.upload_box .upload_list li span em {
	padding: 0 5px;
	color: lightcoral;
	cursor: pointer;
	font-style: normal;
}

.upload_box .upload_abbre,
.upload_box .upload_progress {
	margin-top: 10px;
}

.upload_box .upload_abbre img {
	display: block;
	width: 100%;
}

.upload_box .upload_progress {
	position: relative;
	height: 5px;
	background: #eee;
}

.upload_box .upload_progress .value {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 999;
	height: 100%;
	width: 0%;
	background: #67c23a;
	transition: width 0.3s;
}

.upload_box .upload_drag {
	height: 130px;
	position: relative;
}

.upload_box .upload_drag .icon,
.upload_box .upload_drag .text {
	position: absolute;
	left: 50%;
	transform: translate(-50%, -50%);
}

.upload_box .upload_drag .icon {
	top: 40%;
	width: 80px;
	height: 62px;
	background: url("./assets/img/upload.png") no-repeat;
	background-size: 100% 100%;
}

.upload_box .upload_drag .text {
	top: 80%;
	line-height: 25px;
	color: #999;
	font-size: 12px;
}

.upload_box .upload_drag .text a {
	color: #409eff;
}

.upload_box .upload_mark {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 999;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.8);
	font-size: 12px;
	color: #fff;
	text-align: center;
	line-height: 150px;
}
body,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
blockquote,
dl,
dt,
dd,
ul,
ol,
li,
button,
input,
textarea,
th,
td {
	margin: 0;
	padding: 0;
}
body {
	font-size: 12px;
	font-style: normal;
	font-family: "\5FAE\8F6F\96C5\9ED1", Helvetica, sans-serif;
}
small {
	font-size: 12px;
}
h1 {
	font-size: 18px;
}
h2 {
	font-size: 16px;
}
h3 {
	font-size: 14px;
}
h4,
h5,
h6 {
	font-size: 100%;
}
ul,
ol {
	list-style: none;
}
a {
	text-decoration: none;
	background-color: transparent;
}
a:hover,
a:active {
	outline-width: 0;
	text-decoration: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
hr {
	border: 0;
	height: 1px;
}
img {
	border-style: none;
}
img:not([src]) {
	display: none;
}
svg:not(:root) {
	overflow: hidden;
}
html {
	-webkit-touch-callout: none;
	-webkit-text-size-adjust: 100%;
}
input,
textarea,
button,
a {
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
main,
menu,
nav,
section,
summary {
	display: block;
}
audio,
canvas,
progress,
video {
	display: inline-block;
}
audio:not([controls]),
video:not([controls]) {
	display: none;
	height: 0;
}
progress {
	vertical-align: baseline;
}
mark {
	background-color: #ff0;
	color: #000;
}
sub,
sup {
	position: relative;
	font-size: 75%;
	line-height: 0;
	vertical-align: baseline;
}
sub {
	bottom: -0.25em;
}
sup {
	top: -0.5em;
}
button,
input,
select,
textarea {
	font-size: 100%;
	outline: 0;
}
button,
input {
	overflow: visible;
}
button,
select {
	text-transform: none;
}
textarea {
	overflow: auto;
}
button,
html [type="button"],
[type="reset"],
[type="submit"] {
	-webkit-appearance: button;
}
button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
	border-style: none;
	padding: 0;
}
button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
	outline: 1px dotted ButtonText;
}
[type="checkbox"],
[type="radio"] {
	box-sizing: border-box;
	padding: 0;
}
[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
	height: auto;
}
[type="search"] {
	-webkit-appearance: textfield;
	outline-offset: -2px;
}
[type="search"]::-webkit-search-cancel-button,
[type="search"]::-webkit-search-decoration {
	-webkit-appearance: none;
}
::-webkit-input-placeholder {
	color: inherit;
	opacity: 0.54;
}
::-webkit-file-upload-button {
	-webkit-appearance: button;
	font: inherit;
}
.clearfix:after {
	display: block;
	height: 0;
	content: "";
	clear: both;
}
</style>

