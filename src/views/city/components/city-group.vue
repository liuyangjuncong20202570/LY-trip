<template>
  <div class="city-group">
    <!-- 此处注意层级关系，如果组件标签在循环内部的话会循环产生多个van-index-bar的组件，多个组件会相互覆盖，所以就没有跳转效果整个锚点也会非常粗 -->
    <van-index-bar highlight-color="#ff9854" :index-list="listIndex">
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="(item, index) in groupData.hotCities" :key="index">
          <div class="city" @click="getCityname(item)">{{ item.cityName }}</div>
        </template>
      </div>
      <template v-for="(item, index) in groupData.cities" :key="index">
        <!-- <template v-for="item in allCitydata[active]?.cities"> -->
        <!-- <div class="title">{{ item.group }}</div> -->
        <van-index-anchor :index="item.group" />
        <template v-for="(item, index) in item.cities" :key="index">
          <!-- <h3>{{ item.cityName }}</h3> -->
          <van-cell :title="item.cityName" @click="getCityname(item)" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import useCity from '../../../stores/modules/city'

const router = useRouter()
const cityStore = useCity()
const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})

// 通过计算属性将数据中的group映射到listIndex中
const listIndex = computed(() => {
  const list = props.groupData.cities.map((item) => item.group)
  list.unshift('#')
  return list
})

// 回显选择的城市方位
const getCityname = (city) => {
  cityStore.currentCity = city
  router.back()
}
</script>

<style lang="less" scoped>
.list {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  padding-right: 25px;
  flex-wrap: wrap;
  .city {
    width: 70px;
    height: 28px;
    font-size: 12px;
    border-radius: 14px;
    color: #000;
    text-align: center;
    line-height: 28px;
    background-color: #fff4ec;
    margin-bottom: 10px;
  }
}
</style>
