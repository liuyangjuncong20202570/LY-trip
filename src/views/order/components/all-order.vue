<template>
  <div>
    <template v-for="(item, index) in itemList" :key="index">
      <orderItem :order-item="item"></orderItem>
    </template>
  </div>
</template>

<script setup>
import orderItem from './order-item.vue'
import { storeToRefs } from 'pinia'
import useOrder from '../../../stores/modules/order'

const orderStore = useOrder()
orderStore.fetchOrderList('all')
const { itemList } = storeToRefs(orderStore)
</script>

<style lang="less" scoped></style>
