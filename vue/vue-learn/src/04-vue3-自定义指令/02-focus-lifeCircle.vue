<template>
    <div>
        <div>{{ count }}</div>
        <button v-why v-if="count < 5" @click="increment">+1+1</button>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        const count = ref(0)
        const increment = () => {
            count.value++
        }
        return {
            count,
            increment
        }
    },
    directives: {
        why: {
            created(el, bindings, vnode, preVnode) {
                console.log("why created", el, bindings, vnode, preVnode);
                console.log(bindings.value);
                console.log(bindings.modifiers);
            },
            beforeMount() {
                console.log("why beforeMount");
            },
            mounted() {
                console.log("why mounted");
            },
            beforeUpdate() {
                console.log("why beforeUpdate");
            },
            updated() {
                console.log("why updated");
            },
            beforeUnmount() {
                console.log("why beforeUnmount");
            },
            unmounted() {
                console.log("why unmounted");
            }
        }
    },
}

</script>

<style lang="scss" scoped>

</style>