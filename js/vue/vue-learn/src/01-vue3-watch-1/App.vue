<!-- 
watch(WatcherSource, Callback, [WatchOptions])

type WatcherSource<T> = Ref<T> | (() => T) 

interface WatchOptions extends WatchEffectOptions {
    deep?: boolean // 默认：false 
    immediate?: boolean // 默认：false 
    flush?: string // 默认：'pre'
} 
-->
<template>
    <div>
        <div>watch监听单个reactive数据源: {{ person1.name }}</div>
        <button @click="changePerName1">修改名字</button>
    </div>
    <br>
    <div>
        <div>watch监听单个ref数据源: {{ person2 }}</div>
        <button @click="changePerName2">修改名字</button>
    </div>
    <br>
    <div>
        <div>watch监听单个数据源及停止侦听</div>
        <div>name:{{ name }}</div>
        <div>age:{{ age }}</div>
        <div>flag:{{ flagMsg }}</div>
        <button @click="changeAge">年龄增加</button>
    </div>
    <br>
    <div>
        <div>watch监听多个数据源听</div>
        <div>name:{{ multiName }}</div>
        <div>age:{{ multiAge }}</div>
        <button @click="changeMultiInfo">信息变更</button>
    </div>
</template>

<script setup>
import { watch, ref, reactive, toRefs } from 'vue'

const person1 = reactive({ name: 'Linxae' })
const changePerName1 = () => {
    person1.name = 'Lindex'
}
// 监听reactive中某个属性 WatcherSource参数传入一个getter函数，返回reactive中某个属性
watch(() => person1.name, (newValue, oldValue) => {
    console.log(`新值:${newValue} 旧值:${oldValue}`);
})


const person2 = ref('030')
const changePerName2 = () => {
    person2.value = 'Lindex'
}
// 监听ref对象 WatcherSource参数传入ref对象本身，返回reactive中某个属性
watch(person2, (newValue, oldValue) => {
    console.log(`新值:${newValue} 旧值:${oldValue}`);
})

// watch监听单个数据源及停止侦听
const person3 = reactive({ name: 'Linxae', age: 21 })
let flagMsg = ref('')
let { name, age } = toRefs(person3)
let p3Stop = watch(() => person3.age, (newValue, oldValue) => {
    console.log(newValue, oldValue);
    if (person3.age > 25) {
        flagMsg.value = '年龄到25,已停止监听'
        p3Stop()
    }
})
const changeAge = () => {
    person3.age++
}

// 监听多个数据源
const multiName = ref('gg')
const multiAge = ref(21)
watch([multiName, multiAge], ([newName, newAge], [oldName, oldAge]) => {
    console.log(`新名字：${newName} 新年龄${newAge}`);
    console.log(`旧名字：${oldName} 旧年龄${oldAge}`);
})
const changeMultiInfo = () => {
    multiName.value += 'e'
    multiAge.value++
}
</script>

<style lang="scss" scoped>

</style>