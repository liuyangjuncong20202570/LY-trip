<template>
  <template v-for="(item, index) in itemList" :key="index">
    <orderItem :orderItem="item"></orderItem>
  </template>
</template>

<script setup>
import orderItem from './order-item.vue'
import { storeToRefs } from 'pinia'
import useOrder from '../../../stores/modules/order'

const orderStore = useOrder()
orderStore.fetchOrderList('recent ')
const { itemList } = storeToRefs(orderStore)
</script>

<style lang="less" scoped></style>
