<template>
  <div class="catagories">
    <template v-for="(item, index) in catagories" :key="item.id">
      <div class="item">
        <img :src="item.pictureUrl" alt="" />
        <div class="text">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import useHome from '../../../stores/modules/home'

const homeStore = useHome()
// 发送网络请求
homeStore.getCatagoriesData()

const { catagories } = storeToRefs(homeStore)
</script>

<style lang="less" scoped>
.catagories {
  display: flex;
  overflow-x: auto;
  padding: 0 10px;
  margin-top: 16px;
  height: 80px;
  &::-webkit-scrollbar {
    display: none;
  }
  .item {
    width: 70px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 32px;
      height: 32px;
    }
    .text {
      font-size: 12px;
      margin-top: 8px;
    }
  }
}
</style>
