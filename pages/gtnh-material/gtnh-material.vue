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
			
			<!-- 在 selecter.vue 中的材料点击时都会把数据同步到 pinia 中交由该 popup 渲染	 -->
			<view>
				<uni-popup ref="selecterPopupRef" type="center">
					<uni-popup-dialog 
						type="info" cancelText="取消" confirmText="确定" title="添加到清单" 
						@confirm="confirm" @close="cancel">
							<text>{{ selecterStore.getRecipeInfo() }}</text>
						</uni-popup-dialog>
				</uni-popup>
			</view>
			
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
import { computed, ref, watch } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import Selecter from '@/pages/gtnh-material/selecter.vue'
import List from '@/pages/gtnh-material/list.vue'
import Settings from '@/pages/gtnh-material/settings.vue'
import { useMaterialSelecterStore } from '@/store/gtnh-material-selecter.js'

const currentTab = ref(0)
const comp = [ Selecter, List, Settings ]
const currentComp = computed(() => comp[currentTab.value])

const safeBottom = ref(uni.getSystemInfoSync().safeAreaInsets?.bottom || 0)

const selecterPopupRef = ref(null)
const selecterStore = useMaterialSelecterStore()

const switchTab = (index) => {
	currentTab.value = index
}

const confirm = () => {
	selecterStore.close()
}

const cancel = () => {
	selecterStore.close()
}

watch(() => selecterStore.isShow, (v) => {
	if(v) {
		selecterPopupRef.value?.open()
	}else {
		selecterPopupRef.value?.close()
	}
})

onLoad(() => {
	selecterStore.close()
	selecterPopupRef.value?.close()
})

onUnload(() => {
	selecterStore.close()
	selecterPopupRef.value?.close()
})


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

:deep(.uni-popup-dialog) {
	width: 450rpx !important;
}

</style>