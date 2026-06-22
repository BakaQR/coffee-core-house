<template>
  <view class="webview-container">
    <web-view
      v-if="safeUrl"
      :src="safeUrl"
      @message="onMessage"
    />
    <view v-else class="error">
      <text>无效的网页地址，请将此错误报告给作者（github.com/BakaQR）</text>
      <button @click="goBack">返回</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const safeUrl = ref('')

onLoad((query) => {
  const raw = query?.url || ''
  const decoded = decodeURIComponent(raw)

  // 简单安全校验：只允许 http/https 协议
  if (/^https?:\/\//.test(decoded)) {
    safeUrl.value = decoded
  } else {
    safeUrl.value = ''
  }
})

function goBack() {
  uni.navigateBack()
}

function onMessage(e) {
  console.log('webview message:', e.detail)
}
</script>

<style scoped>
.webview-container {
  width: 100%;
  height: 100vh;
}
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
}
button {
  margin-top: 20rpx;
  color: #007AFF;
}
</style>