<template>
	<div></div>
</template>

<script lang="ts">
import { metaData } from "@/store/data";
export default {
	props: {
		title: String,
	},
	setup(props, { attrs }) {
		metaData.style = attrs.style;
		return { props };
	},
};
</script>

<style scoped></style>
