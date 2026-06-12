<template>
	<view class="container">
		<text>app name: {{ appName }} \n</text>
		<text>vertsion: {{ version }} \n</text>
		<text class="intro">组件文档：</text>
		<uni-link class="uni-link" :href="href" :text="href"></uni-link>
		
		<button class="navigate-to-button" @click="uni.navigateTo({
			url: '/pages/gtnh-calculate/gtnh-calculate',
			success: (res) => { 
				res.eventChannel.emit('acceptData', { id: 'bakaqr', title: 'gtnh-calculate' })
			},
			fail: () => console.log('fail'),
			events: {
				acceptData: function(data) { console.log(data) }
			},
			animationType: 'pop-in',
			animationDuration: 500
		})">跳转至GTNH工具页</button>
		
		<button class="navigate-to-button" @click="uni.navigateTo({
			url: '/pages/gtnh-material/gtnh-material',
			success: (res) => { 
				res.eventChannel.emit('acceptData', { id: 'bakaqr', title: 'gtnh-material' })
			},
			fail: () => console.log('fail'),
			events: {
				acceptData: function(data) { console.log(data) }
			},
			animationType: 'pop-in',
			animationDuration: 500
		})">跳转至GTNH材料计算器</button>
		
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onHide, onShow, onLoad, onUnload } from '@dcloudio/uni-app'

const href = ref('https://uniapp.dcloud.io/component/README?id=uniui')

const app = getApp()
const appName = ref(app.globalData.appName)
const version = ref(app.globalData.version)



onHide(() => {
	console.log('index on hide')
})

onShow(() => {
	console.log('index on show')
})

onLoad(() => {
	console.log('index on load')
})

onUnload(() => {
	console.log('index on unload')
})

</script>

<style>
.container {
	padding: 20px;
	font-size: 14px;
	line-height: 24px;
}

.navigate-to-button{
	width: 250rpx;
	height: 50rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18rpx;
	margin-top: 10px; /* 添加一些间距 */
}
</style>
