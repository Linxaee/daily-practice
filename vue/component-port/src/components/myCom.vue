<template>
	<div class="img-con" @click="isShow = !isShow">
		<img v-if="isShow" src="@/assets/img1.jpg" alt="" />
		<img v-else src="@/assets/img2.jpg" alt="" />
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
let isShow = ref(true);
</script>

<style scoped>
.img-con {
	position: fixed;
	display: flex;
	transition: all 0.2s linear;
}
</style>
