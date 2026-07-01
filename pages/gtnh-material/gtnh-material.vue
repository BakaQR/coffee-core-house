<template>
	<view class="container">
		
		<view class="body">
			
			<!-- #ifndef MP-WEIXIN -->
			<keep-alive>
			  <component :is="currentComp" />
			</keep-alive>
			<!-- #endif -->
			
			<!-- #ifdef MP-WEIXIN -->
			<Selecter v-if="currentTab === 0" />
			<List v-else-if="currentTab === 1" />
			<Settings v-else-if="currentTab === 2" />
			<!-- #endif -->
			
		</view>
		
		<view class="tab-bar">
			<view>
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
const safeBottom = ref(uni.getSystemInfoSync().safeAreaInsets?.bottom || 0)

const switchTab = (index) => {
	currentTab.value = index
}
</script>

<style lang="scss">
$bottom-nav-height: 88rpx;
$safe-bottom: v-bind(safeBottom);

.container {
	position: relative;
	height: 100%;
	overflow: hidden;
}

.tab-bar {
	background-color: #fff;
	height: $bottom-nav-height;
	width: 100%;
	position: absolute;
	bottom: 0%;
	padding-bottom: $safe-bottom;
	display: flex;
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