<template>
    <input type="text" v-model="msg">
    <div>内容:{{ msg }}</div>
</template>

<script setup>
import debounceRef from './hooks/useDebounceRef';
const msg = debounceRef('')
</script>

<style lang="scss" scoped>

</style>