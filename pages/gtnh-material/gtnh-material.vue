<template>
	<view class="container">
		
		<view class="body">
			<keep-alive>
			  <component :is="currentComp" />
			</keep-alive>
		</view>
		
		<view class="tab-bar">
			<view @click="switchTab(0)" :class="{ active: currentTab === 0 }">
				<text>材料</text>
			</view>
			<view @click="switchTab(1)" :class="{ active: currentTab === 1 }">
				<text>清单</text>
			</view>
			<view @click="switchTab(2)" :class="{ active: currentTab === 2 }">
				<text>设置</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue'
import Selecter from '@/pages/gtnh-material/selecter.vue'
import List from '@/pages/gtnh-material/list.vue'
import Settings from '@/pages/gtnh-material/settings.vue'

const currentTab = ref(0)
const comp = [ Selecter, List, Settings ]
const currentComp = computed(() => comp[currentTab.value])

const switchTab = (index) => {
	currentTab.value = index
}
</script>

<style lang="scss">
$bottom-nav-height: 64rpx;

.container {
	position: relative;
	height: 100%;
	overflow: hidden;
}

.tab-bar {
	background-color: #fff;
	height: $bottom-nav-height;
	width: 100%;
	display: flex;
	position: absolute;
	bottom: 0%;
	justify-content: space-around;
	align-items: center;
	font-size: fs('normal');
	
	view {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		
		&.active {
			background-color: #e6f4ff;
			color: #1890ff;
		}
	}
}

.body {
	height: calc(100% - $bottom-nav-height);
}

</style>