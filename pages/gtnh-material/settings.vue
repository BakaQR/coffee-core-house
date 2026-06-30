<template>
	<view class="container">
		<view class="setting-container">
			<view class="header">
				<text class="title-text">材料制作方式</text>
			</view>
			<view v-for="(item, key) in materialStore.list" :key="key">
				<view class="setting" v-if="'check' in item">
					<!-- switch -->
					<text>{{ item.descriptions }}</text>
					<switch @change="changeSwitch(key)" 
					:checked="item.check" />
				</view>
				<view class="setting option" v-else-if="'option' in item">
					<!-- selecter -->
					<text>{{ item.descriptions }}</text>
					<uni-data-select class="uni-data-select" v-model="plateModeSelecter.val" :localdata="plateModeSelecter.display" @change="changeSelecter(plateModeSelecter, key)" :clear="false"/>
				</view>
			</view>
		</view>
		
		<view class="setting-container">
			<view class="header">
				<text class="title-text">系统设置</text>
			</view>
			<view class="setting">
				<text class="damage-text">重置所有设置选项</text>
				<button class="button" @click="reset">重置</button>
			</view>
		</view>
		
	</view>
</template>

<script setup>
import { onLoad, onReady } from '@dcloudio/uni-app'
import { useMaterialSettingsStore } from '@/store/gtnh-material-settings.js'
import { useUniDataSelect } from '@/utils/uni-selecter-data.js'
import { nextTick } from 'vue'

const materialStore = useMaterialSettingsStore()

const plateModeSelecter = useUniDataSelect()

const changeSwitch = (keyName) => {
	materialStore.toggle(keyName)
}

// selecterItem 是 useUniDataSelect() 创建的对象
// keyName 是 pinia 仓库中 list 的子对象
// map 是 pinia 仓库中 list 的子对象的 map 传递给 pinia 设置对应选项的值
const changeSelecter = (selecterItem, keyName) => {
	const option = selecterItem.getCurrentSelectValue()
	const map = materialStore.list[keyName].map
	materialStore.setOption(keyName, map[option])
}

const reset = () => {
	materialStore.reset()
	initializa()
}

const initializa = () => {
	materialStore.initializa()
	
	plateModeSelecter.initializa(
		materialStore.list.PlateMethod.display, 
			materialStore.getOptionMapReverse(
			materialStore.list.PlateMethod.map, 
			materialStore.list.PlateMethod.option)
	)
}

onLoad(() => {
	initializa()
})

</script>

<style lang="scss">
.container {
	padding: 16rpx;
	display: flex;
	flex-direction: column;
	gap: 32rpx;
	height: 100%;
	box-sizing: border-box;
}

.setting-container {
	background-color: #fff;
	border-radius: 8rpx;
	padding: 32rpx;
	display: flex;
	flex-direction: column;
	gap: 32rpx;
}

.setting {
	font-size: fs('normal');
	display: flex;
	justify-content: space-between;
	align-items: center;
	
	text {
		width: 500rpx;
	}
	
	&.option {
		text {
			width: 400rpx;
		}
	}
	
	.damage-text {
		color: #ff3300;
	}
	
	&:deep(.button) {
		font-size: fs('xs');
		width: 120rpx;
		background-color: #ff3300;
		color: white;
		border: none;
	}
}



:deep(.uni-data-select) {
	display: inline-block;
}

</style>
