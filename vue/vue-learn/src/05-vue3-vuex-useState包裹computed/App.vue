<template>
    <div>
        <h2>{{ name }}{{ age }}{{ address }}</h2>
        <h2>当前计数：{{ counter }}</h2>
        <button @click="increment">+1</button>
        <button @click="decrement">-1</button>
        <Child></Child>
    </div>
</template>

<script setup>
import { useStore, mapState } from 'vuex'
import { computed, toRefs } from 'vue'
import Child from './Child.vue'
const store = useStore()
const increment = () => {
    store.commit('increment')
}
const decrement = () => {
    store.commit('decrement')
}

const storeFns = mapState(['name', 'age', 'address', 'counter'])

// const name = computed(() => store.state.name)
// const age = computed(() => store.state.age)
// const address = computed(() => store.state.address)
// const counter = computed(() => store.state.counter)
console.log(store.state);
const { name, age, address, counter } = toRefs(store.state)
console.log(name);
const storeStates = {}
for (const fnKey in storeFns) {
    const fn = storeFns[fnKey].bind({ $store: store })
    storeStates[fnKey] = computed(fn)
}
console.log(storeStates);

</script>

<style lang="scss" scoped>

</style>