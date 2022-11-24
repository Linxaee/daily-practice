<template>
	<div>
		{{ metaData }}
		<slot v-bind="metaData" />
	</div>
</template>

<script setup lang="ts">
// 包裹需要改变状态的组件，通过作用域插槽把metaData传给父组件
import { metaData } from "@/store/data";
console.log(metaData);
</script>

<style scoped></style>
