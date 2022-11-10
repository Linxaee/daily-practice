<template>
    <div>
        <!-- 值改变触发onInvalidate：{{ count }} -->
    </div>
    <div>
        <!-- 手动停止触发onInvalidate：{{ name }} -->
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

// let count = ref(0)
// watchEffect((onInvalidate) => {
//     console.log(count.value);
//     onInvalidate(() => {
//         console.log('执行了onInvalidate');
//     })
// })
// setTimeout(() => { count.value++ }, 1000)

// let name = ref('gg')
// const stopName = watchEffect((onInvalidate) => {
//     onInvalidate(() => {
//         console.log('手动stop执行了onInvalidate');
//     })
// })
// setTimeout(() => { stopName() }, 1000)


// // 定时器注册和销毁
// watchEffect((onInvalidate) => {
//     console.log('定时器开启');
//     const timer = setInterval(() => {
//     }, 1000)
//     onInvalidate(() => { console.log('定时器销毁'); clearInterval(timer) })
// })

// 防抖
let ReId = ref(0)
function Request(id) {
    this.id = id
    this.timer = setTimeout(() => {
        console.log(`2秒过去了，收到id为${id}的请求`);
    }, 2000)
    this.cancel = () => {
        clearTimeout(this.timer)
    }

}
watchEffect((onInvalidate) => {
    let res = new Request(ReId.value)
    console.log(`发起id为${ReId.value}的请求`);
    onInvalidate(() => {
        res.cancel()
        console.log(`取消id为${ReId.value}的请求`);
    })
})
let count = 0
let interval = setInterval(() => {
    if (count > 5) clearInterval(interval)
    ReId.value++
    count++
}, 1000)
</script>

<style lang="scss" scoped>

</style>