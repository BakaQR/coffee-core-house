<template>
  <view class="container">
		<view class="header">
			<text class="title-text">GTNH 材料计算器</text>
			<text class="description-text">
				点击物品材料卡片并设置数量，将其添加到清单中，计算最终所需原材料总量（不包括工具）。\n
				计算非整数倍材料比的物品时可能会有偏差。\n
				大部分内容仍然缺失，数据库正在缓慢更新中...
			</text>
		</view>
		
		<view class="body">
			<view class="sidebar">
				<view v-for="(category, index) in categories" :key="index" @click="selectCategory(category)" :class="{ 'active': selectedCategory === category }">
					<text class="sider-text">{{ category }}</text>
				</view>
			</view>
			
			<view class="content">
				<uni-search-bar v-model="searchValue" @blur="input" @input="input"
				cancelButton="none" radius="8"
				placeholder="输入搜索内容"
				class="search-input"></uni-search-bar>
				<view class="item-container">
					<MaterialCard class="content-material-card" 
					v-for="item in ITEMLIST" :key="item.name" :id="item.id" />
					<MaterialCard class="content-material-card" 
					v-for="item in ITEMLIST" :key="item.name" :id="item.id" />
					<MaterialCard class="content-material-card" 
					v-for="item in ITEMLIST" :key="item.name" :id="item.id" />
					<MaterialCard class="content-material-card" 
					v-for="item in ITEMLIST" :key="item.name" :id="item.id" />
					<MaterialCard class="content-material-card" 
					v-for="item in ITEMLIST" :key="item.name" :id="item.id" />
					<MaterialCard class="content-material-card" 
					v-for="item in ITEMLIST" :key="item.name" :id="item.id" />
				</view>
			</view>
		</view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app'
import { ITEMLIST, CREATINGMETHOD } from '@/utils/gtnh-material-dictionary.js'

// 侧边栏
const categories = ['全部', '机器', '外壳'];
const selectedCategory = ref('');
const selectCategory = (category) => {
  selectedCategory.value = category;
};

// 搜索栏
const searchValue = ref('')
const input = () => {}

const goBack = () => {}

onLoad(() => {
	selectedCategory.value = categories[0]
})
</script>

<style scoped lang="scss">

.container {
	padding: 16rpx;
	display: flex;
	flex-direction: column;
	gap: 16rpx;
	height: 100%;
	box-sizing: border-box;
}

.header {
	display: flex;
	flex-direction: column;
	padding: 32rpx;
	background-color: #fff;
	border-radius: 8rpx;
}

.body {
	height: 100%;
	display: flex;
	overflow-y: hidden;
	padding: 32rpx;
	background-color: #fff;
	border-radius: 8rpx;
	gap: 16rpx;
}

.sidebar {
  width: 150rpx;
	flex-shrink: 0;  /* 不被压缩 */
	background-color: #fff;
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.sidebar view {
  padding: 16rpx;
  color: #333;
	text-align: center;
  cursor: pointer;
	border-radius: 8rpx;
}

.sidebar view.active {
  background-color: #e6f4ff;
  color: #1890ff;
	
	&:hover{
		background-color: #e6f4ff;
	}
}

.sidebar view:hover {
  background-color: #f0f0f0;
}

.sidebar view:active {
  background-color: #e6f4ff;
}

.sider-text {
	font-size: fs('normal');
}

.content {
	display: flex;
	flex-direction: column;
	gap: 32rpx;
	overflow-y: auto;
	box-sizing: border-box;
	scrollbar-width: none;
}

.item-container {
	display: flex;
	flex-wrap: wrap;
	gap: 32rpx;
	justify-content: space-around;
	align-items: center;
}

.search-input {
	padding: 0;
	width: 100%; 
	
}

</style>
