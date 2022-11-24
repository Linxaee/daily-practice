<template>
	<nav>
		<router-link to="/foo">to foo</router-link>
	</nav>
	<div>home</div>
	<!-- 占位占位并传入样式 -->
	<comProxy myStyle="width:150px;height:150px;border-radius: 50%; margin-left: 600px; overflow: hidden"></comProxy>
</template>

<script lang="ts" setup>
import comProxy from "../components/comProxy.vue";
</script>

<style lang="scss" scoped></style>
