<template>
	<router-view />
	<comContainer v-slot="{ style }">
		<!-- 接受作用域插槽传入的metaData，结构出style赋值给被包裹的组件 -->
		<myCom :style="style"></myCom>
	</comContainer>
</template>

<script lang="ts" setup>
import comContainer from "./components/comContainer.vue";
import myCom from "@/components/myCom.vue";
</script>

<style lang="scss">
body {
	background-color: black;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: white;
}

nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
