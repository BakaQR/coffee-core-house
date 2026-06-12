<template>
  <view class="material-card">
    <view class="header">
      <image v-if="icon" :src="icon" class="icon"></image>
      <text class="title">{{ title }}</text>
    </view>
    <view class="content">
      <view class="section" v-for="(section, index) in sections" :key="index">
        <text class="section-title">{{ section.title }}</text>
        <text class="section-content">{{ section.content }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  icon: {
    type: String,
    default: '/static/logo.png'
  },
  title: {
    type: String,
		default: '默认标题',
    required: true
  },
  sections: {
    type: Array,
    default: () => [
			{title: '标题1', content: '内容1'},
			{title: '标题2', content: '内容2'},
			{title: '标题3', content: '内容3'},
			{title: '标题3', content: '内容3'},
		]
  }
});
</script>

<style scoped lang="scss">
$font-size-normal: 16rpx;
$font-size-xl: 20rpx;

.material-card {
  width: 250rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #f0f0f0;
}

.icon {
  width: 32rpx;
  height: 32rpx;
  margin-right: 16rpx;
}

.title {
  font-size: $font-size-xl;
  color: #333;
}

.content {
  display: flex;
  justify-content: space-around;
  padding: 20rpx;
}

.section {
  text-align: center;
}

.section-title {
  font-size: $font-size-normal;
  color: #666;
  margin-bottom: 8rpx;
}

.section-content {
  font-size: $font-size-xl;
  color: #333;
}
</style>
