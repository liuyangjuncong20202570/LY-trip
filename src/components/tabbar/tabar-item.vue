<template>
  <div :class="{ active: index === currentIndex }" class="tabbar-item">
    <img
      v-if="index === currentIndex"
      :src="getUrlData(content.imgActive)"
      alt=""
    />
    <img v-else :src="getUrlData(content.src)" alt="" />

    <span class="text">{{ content.text }}</span>
  </div>
</template>

<script setup>
import { getUrlData } from '../../utils/load_assest'
defineProps({
  content: {
    type: Object,
    required: true
  },
  index: {
    type: Number
  },
  currentIndex: {
    type: Number
  }
})
</script>

<style lang="less" scoped>
.tabbar-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  .text {
    font-size: 12px;
  }
  img {
    width: 36px;
  }
  // &.active {
  //   // 此处在active前加上&相当于是一个与父级同级的选择器
  //   // .tabbar-item.active其子元素都会继承其样式
  //   color: var(--primaryColor);
  // }
}
</style>
