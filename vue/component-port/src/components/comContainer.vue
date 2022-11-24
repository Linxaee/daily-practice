<template>
	<div>
		{{ metaData }}
		<slot v-bind="metaData" />
	</div>
</template>

<script setup lang="ts">
import { metaData } from "@/store/data";
console.log(metaData);
</script>

<style scoped></style>
