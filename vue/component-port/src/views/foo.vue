<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<nav>
		<router-link to="/">to home</router-link>
	</nav>
	<div>foo</div>
	<comProxy class="comProxy" style="margin-left: 10px; overflow: hidden"></comProxy>
</template>

<script lang="ts" setup>
import comProxy from "../components/comProxy.vue";
</script>

<style lang="scss" scoped></style>
