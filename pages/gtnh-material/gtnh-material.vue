<template>
  <view class="container">
    <view class="sidebar">
      <view v-for="(category, index) in categories" :key="index" @click="selectCategory(category)" :class="{ 'active': selectedCategory === category }">
        {{ category }}
      </view>
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

.sidebar view {
  width: 100%;
  margin-bottom: 10rpx;
  padding: 20rpx;
  color: #333;
  font-size: 16rpx;
  cursor: pointer;
}

.sidebar view.active {
  background-color: #e6f4ff;
  color: #1890ff;
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
}
</style>
