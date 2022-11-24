<template>
	<div></div>
</template>

<script lang="ts">
import { metaData } from "@/store/data";
export default {
	// 状态代理，组价挂载时将metaData的style赋值为传入的属性
	setup(props, { attrs }) {
		metaData.style = attrs.myStyle;
	},
};
</script>

<style scoped></style>
