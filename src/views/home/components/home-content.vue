<template>
  <div class="home-content" ref="homeContentRef">
    <div class="title">热门推荐</div>
    <div class="list">
      <template v-for="(item, index) in homeLists" :key="item.data.houseId">
        <homeItemV9
          v-if="item.discoveryContentType === 9"
          :item-data="item.data"
          @click="toDeatil(item.data)"
        />
        <!-- 对组件绑定的点击事件与样式会直接绑定到跟组件上 -->
        <homeItemV3
          v-else-if="item.discoveryContentType === 3"
          :item-data="item.data"
          @click="toDeatil(item.data)"
        />
      </template>
    </div>
    <!-- <button @click="getData">获取数据</button> -->
  </div>
</template>

<script setup>
import { watch, ref, onActivated } from 'vue'
import scrollTobuttom from '../../../hooks/scrollTobottom/scrollTobuttom.js'
import homeItemV9 from '../../../components/home-item/home-item-v9/home-item-v9.vue'
import homeItemV3 from '../../../components/home-item/home-item-v3/home-item-v3.vue'
import { storeToRefs } from 'pinia'
import useHome from '../../../stores/modules/home'
import { useRouter } from 'vue-router'
const homeStore = useHome()
// 发送网络请求
const getData = () => {
  homeStore.getHomeLists()
}
const { homeLists } = storeToRefs(homeStore)
// 监听滚顶到底部进行数据加载
// 封装成类
// scrollTobuttom.scrollTobuttom(() => {
//   homeStore.getHomeLists()
// })
// 封装成钩子函数
// 思路一
// scrollTobuttom(getData)
// 思路二
const homeContentRef = ref()
const { isReachbottom, scrollTop } = scrollTobuttom()
watch(isReachbottom, (newValue) => {
  if (newValue) {
    getData()
    isReachbottom.value = false
  }
})

const router = useRouter()
const toDeatil = (value) => {
  router.push('/detail/' + value.houseId)
}
// 利用onActivated可以使整个页面回到记录的scrollTop滚动位置
// onActivated(() => {
//   homeContentRef.value.scrollTop = scrollTop
// })
</script>

<style lang="less" scoped>
.home-content {
  padding: 10px 8px;
  .title {
    font-size: 22px;
    padding: 10px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
