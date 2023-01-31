<template>
  <div class="swiper">
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      lazy-render
    >
      <template v-for="(item, index) in swiperData" :key="index">
        <van-swipe-item class="item">
          <img :src="item.url" alt="" />
        </van-swipe-item>
      </template>

      <template #indicator="{ active, total }">
        <div class="indicator">
          <template v-for="(value, key, index) in swiperGroup">
            <!--   不能用swiperData[active].title来获取数据，因为循环每次停止的active都一样，会造成三条数据都会是所在数据组的第一条数据的title，是一样的数据，无意义 -->
            <!-- <span class="item">{{ swiperData[active]?.title }}</span> -->
            <!-- 判断当前所处轮播图是否动态切换样式，可以看是否当前所处轮播图数据的enumPictureCategory是否和key相同 -->
            <!-- 切记使用==因为key是字符串 -->
            <span
              class="item"
              :class="{
                active: swiperData[active]?.enumPictureCategory == key
              }"
            >
              <span>{{ getName(value[0].title) }}</span>
              <span
                class="item"
                v-if="swiperData[active]?.enumPictureCategory == key"
                >{{ getIndex(swiperData[active]) + 1 }} /
                {{ value.length }}</span
              >
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import useDetail from '@/stores/modules/detail.js'

const detailStore = useDetail()
const { detailData } = storeToRefs(detailStore)
const mainPart = computed(() => detailData.value.mainPart)
const swiperData = detailData.value.mainPart.topModule.housePicture.housePics
// 对后端传过来的数据进行分组处理，后端数据中每一个数据都有一个字段名为enumPictureCategory表示当前数据为房间的哪一个位置
// 所以主要逻辑是对数据进行分组并存入一个对象中
// {'2':[],'4':[],'9':[]}
// 创建储存对象
const swiperGroup = {}
// 思路一：只做一次循环
for (const item of swiperData) {
  let valueData = swiperGroup[item.enumPictureCategory]
  // 当第一次进行取值时，swiperGroup是空的，所以valueData是undefined，所以进行判断
  if (!valueData) {
    valueData = []
    // 初始化valueData后，将valueData传给原先的swiperGroup
    swiperGroup[item.enumPictureCategory] = valueData
  }
  // 以上两步，说明我们已经创建成功{'2':[],'4':[],'9':[]}的数据存储对象，下面开始数据插入
  valueData.push(item)
}
// console.log(swiperGroup)
// 思路二：两次for循环构建swiperGroup
// 第一次for循环，构建出swiperGroup的键值
// for (const item of swiperData) {
//   swiperGroup[item.enumPictureCategory] = []
// }
// // 第二次for循环将item数据插入到swiperGroup中
// for (const item of swiperData) {
//   swiperGroup[item.enumPictureCategory].push(item)
// }
// console.log(swiperGroup)
const getName = (val) => {
  return val.replace('：', '').replace('【', '').replace('】', '')
}

const getIndex = (item) => {
  const valueData = swiperGroup[item.enumPictureCategory]
  return valueData.findIndex((data) => item === data)
}
</script>

<style lang="less" scoped>
.swiper {
  .my-swipe {
    .item {
      img {
        width: 100%;
      }
    }
  }
  .indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    display: flex;
    padding: 2px 5px;
    font-size: 12px;
    color: #fff;
    background: rgba(0, 0, 0, 0.8);
    .item {
      margin: 0 3px;
      &.active {
        padding: 1px 5px;
        border-radius: 5px;
        background-color: #fff;
        color: #333;
      }
    }
  }
}
</style>
