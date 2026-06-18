<template>
	<view class="container">
		<view class="coordinates-input">
			<text class="title-text">GTNH 矿脉区块定位器</text>
			<text class="description-text">
				通过输入坐标及半径计算附近矿脉原点坐标，矿脉原点分布步长为48
			</text>
			<uni-section title="请输入x坐标" type="line" padding titleFontSize='16rpx' >
				<uni-easyinput type="number" trim="all" placeholder="请输入x坐标"
				v-model="xInput.display" @input="xInput.onInput" @blur="xInput.onBlur" 
				@clear="xInput.onClear">
				</uni-easyinput>
			</uni-section>
			<uni-section title="请输入y坐标" type="line" padding titleFontSize='16rpx' >
				<uni-easyinput type="number" trim="all" placeholder="请输入y坐标"
				v-model="yInput.display" @input="yInput.onInput" @blur="yInput.onBlur"
				@clear="yInput.onClear">
				</uni-easyinput>
			</uni-section>
			<uni-section title="请输入半径" type="line" padding titleFontSize='16rpx' >
				<uni-easyinput type="number" trim="all" placeholder="请输入半径"
				v-model="rInput.display" @input="rInput.onInput" @blur="rInput.onBlur"
				@clear="rInput.onClear">
				</uni-easyinput>
			</uni-section>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import {onHide, onShow, onLoad, onUnload } from '@dcloudio/uni-app'
import { getVeinOriginsSquare } from '@/utils/veins-calculater.js'
import { useIntegerInput } from '@/utils/integer-input.js'

const xInput = useIntegerInput(0)
const yInput = useIntegerInput(0)
const rInput = useIntegerInput(48)


onHide(() => {
	console.log('gtnh-veins on hide')
})

onShow(() => {
	console.log('gtnh-veins on show')
})

onLoad(() => {
	console.log('gtnh-veins on load')
})

onUnload(() => {
	console.log('gtnh-veins on unload')
})

</script>

<style lang="scss">
.container{
	padding: 24rpx;
}

.coordinates-input {
	background-color: #fff;
	border-radius: 8rpx;
	overflow: hidden;
	padding: 16rpx 32rpx;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.title-text {
	font-size: fs('xxl');
	font-weight: bold;
	color: #027fff;
	display: block;
}

.description-text {
	font-size: fs('small');
	color: #6c6c6c;
}


</style>
