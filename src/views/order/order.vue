<template>
  <div class="order">
    <!-- 顶部导航栏 -->
    <Navbar>
      <template #content>
        <div class="title">订单列表</div>
      </template>
    </Navbar>
    <!-- /顶部导航栏 -->

    <!-- 顶部标题栏 -->
    <Tabbar @current-index="currentIndex" :tabbar-item="tabbarValue"></Tabbar>
    <!-- /顶部标题栏 -->

    <!-- 具体详情页 -->
    <allOrder v-if="index === 0"></allOrder>
    <recentOrder v-else-if="index === 1"></recentOrder>
    <pendOrder v-else></pendOrder>
    <!-- /具体详情页 -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useOrder from '../../stores/modules/order.js'
import recentOrder from './components/recent-order.vue'
import allOrder from './components/all-order.vue'
import pendOrder from './components/pend-order.vue'
import Navbar from '../../components/navbar/navbar.vue'
import Tabbar from './components/tabbar.vue'

const tabbarValue = ref(['全部订单', '近期订单', '待支付'])
const index = ref(0)

const currentIndex = (value) => {
  index.value = value
}

const orderStore = useOrder()
orderStore.fetchOrderList('all')
</script>

<style lang="less" scoped>
.order {
  background-color: #f7f8fb;
  padding-bottom: 25px;
  .title {
    font-size: 16px;
  }
}
</style>
