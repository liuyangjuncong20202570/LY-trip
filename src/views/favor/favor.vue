<template>
  <div class="favor">
    <div class="navbar">
      <navbar>
        <template #leftwrite> 旅途 </template>
        <template #content>
          <van-tabs v-model:active="active" type="card" @click-tab="onClickTab">
            <van-tab title="我的收藏"></van-tab>
            <van-tab title="浏览历史"></van-tab>
          </van-tabs>
        </template>
      </navbar>
    </div>
    <collection v-if="isClick"></collection>
    <history v-else></history>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import collection from './components/collection.vue'
import history from './components/history.vue'
import navbar from '../../components/navbar/navbar.vue'

const active = ref(0)
const isClick = ref(true)
const onClickTab = () => {
  if (active.value === 0) {
    isClick.value = true
  } else {
    isClick.value = false
  }
}
</script>

<style lang="less" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
}
</style>
