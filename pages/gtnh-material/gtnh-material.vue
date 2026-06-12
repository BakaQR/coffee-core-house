<template>
  <view class="container">
    <view class="sidebar">
      <button v-for="(category, index) in categories" :key="index" @click="selectCategory(category)">
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

const categories = ['全部', '功能', '杂项'];
const selectedCategory = ref('');

const selectCategory = (category) => {
  selectedCategory.value = category;
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 200px;
  background-color: #f4f4f4;
  padding: 10px;
  border-right: 1px solid #ccc;
}

.sidebar button {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  background-color: #fff;
  cursor: pointer;
}

.sidebar button:hover {
  background-color: #e0e0e0;
}

.content {
  flex-grow: 1;
  padding: 20px;
}
</style>
