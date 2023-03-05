<template>
  <div class="collection">
    <van-tabs v-model:active="active">
      <van-tab title="房屋">
        <template v-for="(item, index) in itemList" :key="index">
          <collection-item :item-list="item"></collection-item>
        </template>
      </van-tab>
      <van-tab title="房东">
        <landlord></landlord>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import landlord from './landlord.vue'
import collectionItem from './collection-item.vue'
import useFavor from '@/stores/modules/favor.js'
import { storeToRefs } from 'pinia'

const active = ref(0)
const favorStore = useFavor()
favorStore.getItem()
const { itemList } = storeToRefs(favorStore)
</script>

<style lang="less" scoped>
.collection {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>
