<template>
	<view class="container">
		<view class="setting-container">
			<view class="header">
				<text class="title-text">材料制作方式</text>
			</view>
			<view v-for="(item, key) in materialSettingStore.list" :key="key">
				<view class="setting" v-if="'check' in item">
					<!-- switch -->
					<text>{{ item.descriptions }}</text>
					<switch @change="changeSwitch(key)" 
					:checked="item.check" />
				</view>
				<view class="setting option" v-else-if="'option' in item">
					<!-- selecter -->
					<text>{{ item.descriptions }}</text>
					<uni-data-select class="uni-data-select" 
					v-if="selecterObj[key]"
					v-model="selecterObj[key].val" 
					:localdata="selecterObj[key].display" 
					@change="changeSelecter(selecterObj[key], key)" 
					:clear="false"/>
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
import { onLoad } from '@dcloudio/uni-app'
import { useMaterialSettingsStore } from '@/store/gtnh-material-settings.js'
import { useUniDataSelect } from '@/utils/uni-selecter-data.js'
import { nextTick, onMounted, ref } from 'vue'

const materialSettingStore = useMaterialSettingsStore()

const selecterObj = ref({})

const changeSwitch = (keyName) => {
	materialSettingStore.toggle(keyName)
}

// selecterItem 是 useUniDataSelect() 创建的对象
// keyName 是 pinia 仓库中 list 的子对象
// map 是 pinia 仓库中 list 的子对象的 map 传递给 pinia 设置对应选项的值
const changeSelecter = (selecterItem, keyName) => {
	const option = selecterItem.getCurrentSelectValue()
	const map = materialSettingStore.list[keyName].map
	materialSettingStore.setOption(keyName, map[option])
}

const initialize = () => {
	materialSettingStore.initialize()
	
	const list = materialSettingStore.list
	for(const key in list){
		const item = list[key]
		if('option' in item){
			const selecter = useUniDataSelect()
			selecter.initialize(
				item.display, 
				materialSettingStore.getOptionMapReverse(item.map, item.option)
			)
			selecterObj.value[key] = selecter
		}
	}
}

const reset = () => {
	materialSettingStore.reset()
	initialize()
}

// #ifndef MP-WEIXIN
onLoad(() => {
	initialize()
})
// #endif

// #ifdef MP-WEIXIN
onMounted(() => {
	initialize()
})
// #endif


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
		font-size: fs('small');
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
