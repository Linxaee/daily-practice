<template>
	<div class="container">
		<h2>{{ store.state.name }}</h2>
		<h2 @click="incrementAction">home里的counter:{{ counter }}</h2>
		<h2>home里的doubleCounter:{{ store.getters["home/doubleCounter"] }}</h2>
		<h2>home里的address:{{ address }}</h2>
		<h2 @click="userIncrement">user里的counter:{{ store.state.user.counter }}</h2>
		<h2>user里的name:{{ store.state.user.name }}</h2>
	</div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, toRefs } from "vue";

const store = useStore();

const { address, counter } = toRefs(store.state.home);

const homeIncrement = function () {
	store.commit("home/increment");
};
const userIncrement = function () {
	store.commit("user/increment");
};
const incrementAction = function () {
	store.dispatch("home/incrementAction");
};
</script>

<style lang="scss" scoped>
h2 {
	width: 300px;
	margin: 0 auto;
}
</style>
