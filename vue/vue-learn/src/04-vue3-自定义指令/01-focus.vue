<template>
    <div>
        <input type='text' ref='input' v-focus />
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    // 局部实现
    // directives: {
    //     focus: {
    //         mounted(el) {
    //             el.focus()
    //         },
    //     }
    // }
}

// const input = ref(null)
// // 默认实现
// // onMounted(() => {
// //     console.log(input.value)
// //     input.value.focus()
// // })
// setup实现
const vFocus = {
    mounted(el) {
        console.log(123);
        el.focus()
    }
}
</script>

<style lang="scss" scoped>

</style>