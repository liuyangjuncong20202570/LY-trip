<template>
  <div class="history">
    <template v-for="(item, index) in historyList" :key="index">
      <collection-item :item-list="item"></collection-item>
    </template>
  </div>
</template>

<script setup>
import collectionItem from './collection-item.vue'
import useFavor from '@/stores/modules/favor.js'
import { storeToRefs } from 'pinia'

const favorStore = useFavor()
favorStore.getHistoryList()
const { historyList } = storeToRefs(favorStore)
</script>

<style lang="less" scoped>
.history {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>
