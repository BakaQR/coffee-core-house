<template>
  <view class="material-card">
    <view class="header">
      <image v-if="icon" :src="icon" class="icon"></image>
      <text class="title">{{ title }}</text>
    </view>
    <view class="content">
      <view class="section" v-for="(section, index) in sections" :key="index">
				<image v-if="section.icon" :src="section.icon" class="section-icon"></image>
				<text class="section-name">{{ section.name }}</text>
				<text>&nbsp;*&nbsp;</text>
				<text class="section-number">{{ section.number }}</text>
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
      { icon: '/static/gtnh/material/Bronze.png', name: '青铜锭', number: '8' },
      { icon: '/static/c2.png', name: '标题2', number: '2' },
      { icon: '/static/c3.png', name: '标题3', number: '3' },
      { icon: '/static/c4.png', name: '标题4', number: '4' },
    ]
  }
});
</script>

<style scoped lang="scss">
$font-size-normal: 18rpx;
$font-size-xl: 20rpx;

.material-card {
  width: 100%;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.header {
  display: flex;
	justify-content: center;
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
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20rpx;
	gap: 16rpx 0;
}

.section {
  text-align: center;
  width: 30%;
	height: 40rpx;
  box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
}

.section-title {
  font-size: $font-size-normal;
  color: #666;
}

.section-icon{
	width: 24rpx;
	height: 24rpx;
	margin-right: 8rpx;
}

</style>
