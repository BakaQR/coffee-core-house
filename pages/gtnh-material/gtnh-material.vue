<template>
  <view class="container">
    <view class="sidebar">
      <view v-for="(category, index) in categories" :key="index" @click="selectCategory(category)" :class="{ 'active': selectedCategory === category }">
        {{ category }}
      </view>
    </view>
    <view class="content">
      <text v-if="selectedCategory">当前分类: {{ selectedCategory }}</text>
      <MaterialCard class="content-material-card" />
      <MaterialCard class="content-material-card" />
      <MaterialCard class="content-material-card" />
      <MaterialCard class="content-material-card" />
      <MaterialCard class="content-material-card" />
      <MaterialCard class="content-material-card" />
      <MaterialCard class="content-material-card" />
      <MaterialCard class="content-material-card" />
      <MaterialCard class="content-material-card" />
      <MaterialCard class="content-material-card" />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app'

const categories = ['全部', '机器', '外壳'];
const selectedCategory = ref('');

const selectCategory = (category) => {
  selectedCategory.value = category;
};

onLoad(() => {
	selectedCategory.value = categories[0]
})
</script>

<style scoped lang="scss">
$font-size-normal: 18rpx;
$font-size-xl: 20rpx;

.container {
	height: 100%;
	padding: 0;
  display: flex;
}

.sidebar {
  width: 150rpx;
  background-color: #f8f8f8;
}

.sidebar view {
  padding: 16rpx;
	margin: 16rpx 8rpx;
  color: #333;
  font-size: $font-size-xl;
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

.content {
  flex-grow: 1;
  padding: 20rpx;
	font-size: $font-size-normal;
	overflow-y: auto;
}

.content-material-card{
	margin: 16rpx 0;
	
}
</style>
