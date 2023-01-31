<template>
  <div class="city">
    <!-- 顶部区域 -->
    <div class="top">
      <van-search
        v-model="text"
        show-action
        placeholder="城市/区域/位置"
        shape="round"
        @cancel="onCancel"
      />
      <!-- 注意当遍历对象时，各个变量之间的关系：（value，key，index）in obj -->
      <van-tabs v-model:active="active" color="#ff9854" line-height="2">
        <!-- 通过name属性将allCitydata中的key绑定到active中，这样在拿数据时会更方便获取 -->
        <template v-for="(value, key, index) in allCitydata" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
      <!-- /顶部区域 -->
    </div>
    <!-- 内容区域 -->
    <div class="content">
      <!-- ?.的作用是防止一开始页面进行加载时由于currentData是undefined而报错不继续执行代码 -->
      <!-- 只有当currentData有值时才会渲染后面的cities参数 -->
      <!-- 性能优化 -->
      <!-- <cityGroup :group-data="currentCity"></cityGroup> -->
      <template v-for="(value, key, index) in allCitydata" :key="key">
        <cityGroup v-show="active === key" :group-data="value"></cityGroup>
      </template>
    </div>
    <!-- /内容区域 -->
  </div>
</template>

<script setup>
import cityGroup from './components/city-group.vue'
import { computed, ref } from 'vue'
import useCity from '../../stores/modules/city.js'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

// 变量声明
const text = ref('')
const router = useRouter()
const cityStore = useCity()
const active = ref() //当tab中有name属性时，此时绑定的就不再是index索引而是name属性，这样可以方便数据管理

// 方法声明与调用
const onCancel = () => {
  router.back()
}
cityStore.getCityData()
cityStore.getCityLocation()
console.log(cityStore.cityLocation)
const { allCitydata } = storeToRefs(cityStore)
// 获取国内/海外城市数据
//  注意此处的currentData是通过allCity解包后获取的，不是相应式，所以可以用一个计算属性进行包裹
const currentCity = computed(() => allCitydata.value[active.value])

// getCityAll().then((res) => {
//   console.log(res)
// })

// 在此处发送网络请求有两个缺点：
// 1、所有的网络请求赛道一个组件内部会显得整个组件十分臃肿
// 2、如果有其他的组件需要使用这些数据，就需要一个个的通过props传参将值传给他们
// 所以正确用法应该是将网络请求封装到pinia中
// onMounted(async () => {
//   const { data } = await getCityAll()
//   cityData.value = data
// })
</script>

<style lang="less" scoped>
.city {
  .top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .content {
    margin-top: 98px;
    height: calc(100vh - 98px);
    // height: 100vh;
    overflow-y: auto;
  }
}
</style>
