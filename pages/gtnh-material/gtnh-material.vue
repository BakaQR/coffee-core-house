<template>
  <view class="container">
    <view class="sidebar">
      <button v-for="(category, index) in categories" :key="index" @click="selectCategory(category)" :class="{ 'active': selectedCategory === category }">
        {{ category }}
      </button>
    </view>
    <view class="content">
      <text v-if="selectedCategory">当前分类: {{ selectedCategory }}</text>
      <!-- 在这里添加右边栏的内容 -->
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app'

const categories = ['全部', '机器主方块', '外壳方块'];
const selectedCategory = ref('');

const selectCategory = (category) => {
  selectedCategory.value = category;
};


onLoad(() => {
	selectedCategory.value = categories[0]
})
</script>

<style scoped>
.container {
  display: flex;
	height: 100%;
}

.sidebar {
  width: 150rpx;
  background-color: #f4f4f4;
  padding: 10rpx;
  border-right: 1rpx solid #ccc;
}

.sidebar button {
  width: 100%;
  margin-bottom: 10rpx;
  padding: 10rpx;
  border: none;
  background-color: #fff;
  cursor: pointer;
	font-size: 16rpx;
}

.sidebar button.active {
  background-color: #1890ff;
  color: #fff;
}

.sidebar button:hover {
  background-color: #e0e0e0;
}

.content {
  padding: 20rpx;
}
</style>
