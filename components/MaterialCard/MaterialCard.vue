<template>
  <view class="material-card">
    <view class="content">
      <image v-if="item.icon" :src="item.icon" class="icon"></image>
      <text class="name">{{ item.name }}</text>
    </view>
  </view>
</template>

<script setup>
import { defineProps } from 'vue';
import { onLoad } from '@dcloudio/uni-app'
import { ITEMLIST } from '@/utils/gtnh-material-dictionary.js'

const props = defineProps({
  id: {
    type: String,
    default: 'Coke_Oven'
  }
});

// 根据传入 id 搜索 ITEMLIST 字典中对应的材料
const item = ITEMLIST[props.id]

</script>

<style scoped lang="scss">

.material-card {
	width: 180rpx;
  border-radius: 4rpx;
  box-shadow: 0 4rpx 4rpx rgba(0, 0, 0, 0.1);
  overflow: hidden;
	background-color: #fafafa;
	border-radius: 8rpx;
  box-shadow: 0 4rpx 4rpx rgba(0, 0, 0, 0.1);
	padding: 16rpx;
}

.icon {
  width: 120rpx;
  height: 120rpx;
}

.name {
  font-size: fs('xl');
  color: #333;
}

.content {
  display: flex;
  flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 16rpx;
}

.material-container {
  text-align: center;
  width: 30%;
	height: 40rpx;
  box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
}


</style>
