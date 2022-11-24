<template>
	<nav>
		<router-link to="/foo">to foo</router-link>
	</nav>
	<div>home</div>
	<comProxy class="comProxy" style="border-radius: 50%; margin-left: 200px; overflow: hidden"></comProxy>
</template>

<script lang="ts" setup>
import comProxy from "../components/comProxy.vue";
</script>

<style lang="scss" scoped></style>
