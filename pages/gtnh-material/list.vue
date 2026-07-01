<template>
	<text>list page</text>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app'

// #ifndef MP-WEIXIN
onLoad(() => {
	
})
// #endif

// 微信小程序中不支持动态组件 因此使用 v-if 进行渲染 没有 onLoad 生命周期 使用 onMounted 替代
// #ifdef MP-WEIXIN
onMounted(() => {
	
})
// #endif

</script>

<style lang="scss">
</style>