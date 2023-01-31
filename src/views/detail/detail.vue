<template>
  <div ref="detail" class="top-page detail">
    <tabControl
      class="tabs"
      v-if="istabShow"
      :item="names"
      ref="tabbars"
      @change-channel="changeChannel"
    ></tabControl>
    <van-nav-bar
      title="房屋详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 通过v-memo来控制整个首页部分的更新，只有在mainpart发生变化时才进行更新 -->
    <div v-if="mainPart" v-memo="[mainPart]">
      <roomSwiper></roomSwiper>
      <infos name="描述" :ref="getcpnRef"></infos>
      <facility
        name="设施"
        :ref="getcpnRef"
        :housefacility="mainPart.dynamicModule.facilityModule.houseFacility"
      ></facility>
      <landlord
        name="房东"
        :ref="getcpnRef"
        :landlord="mainPart.dynamicModule.landlordModule"
      ></landlord>
      <comment
        name="评论"
        :ref="getcpnRef"
        :comment="mainPart.dynamicModule.commentModule"
      ></comment>
      <notice
        name="须知"
        :ref="getcpnRef"
        :notice="mainPart.dynamicModule.rulesModule.orderRules"
      ></notice>
      <mapSection
        name="周边"
        :ref="getcpnRef"
        :position="mainPart.dynamicModule.positionModule"
      ></mapSection>
      <intro :price-intro="mainPart.introductionModule"></intro>
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">征程旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import useDetail from '@/stores/modules/detail.js'
import roomSwiper from './components/detail_01-swiper.vue'
import infos from './components/detail_02-infos.vue'
import facility from './components/detail_03-facility.vue'
import landlord from './components/detail_04-landlord.vue'
import comment from './components/detail_05-comment.vue'
import notice from './components/detail_06-notice.vue'
import mapSection from './components/detail_07-map.vue'
import intro from './components/detail_08-intro.vue'
import tabControl from '../../components/tab-control/tab-control.vue'
import scrollTobuttom from '@/hooks/scrollTobottom/scrollTobuttom.js'

let isClick = false
let currentInstance = -1
const route = useRoute()
const router = useRouter()
const onClickLeft = () => {
  router.back()
}

const detailStore = useDetail()
detailStore.getDetail(route.params.id)
const { detailData } = storeToRefs(detailStore)
const mainPart = computed(() => detailData.value.mainPart)

// tab-control滚动一定位置显示
const detail = ref()
const { scrollTop } = scrollTobuttom(detail)
// console.log(scrollTop.value)
const istabShow = computed(() => {
  return scrollTop.value > 300
})

// 点击tabcontrol来跳转到页面中的某一位置
// ref获取vue中的dom元素高级用法，可以通过ref传递一个函数，每一个绑定过的组件只要经过刷新就会执行一遍该函数
const elRef = ref({})
const names = computed(() => {
  return Object.keys(elRef.value)
})

const getcpnRef = (value) => {
  // elRef.value.push(value.$el)
  if (!value) return
  const key = value?.$el?.getAttribute('name')
  // console.log(key)
  elRef.value[key] = value.$el
}

const changeChannel = (attr) => {
  isClick = true
  let instance = elRef.value[attr.item].offsetTop
  if (attr.index !== 0) {
    instance = instance - 40
  }
  currentInstance = instance
  detail.value.scrollTo({
    top: instance,
    behavior: 'smooth'
  })
}

// tabcontrol随着页面滚动变化标签内容
const tabbars = ref()
// let currentIndex = ref(0)
watch(scrollTop, (newVal) => {
  if (currentInstance === newVal) {
    isClick = false
  }
  if (isClick) return
  const values = Object.values(elRef.value)
  const tabs = values.map((item) => item.offsetTop)
  // console.log(tabs)
  let index = tabs.length - 1
  // tabs.forEach((item) => {
  //   if (newVal <= item) {
  //     index = tabs.indexOf(item) - 1
  //   }
  // })
  for (let i = 0; i < tabs.length; i++) {
    if (newVal + 44 <= tabs[i]) {
      index = i - 1
      break
    }
  }
  // console.log(index)
  // 简便方法，直接通过ref获取组件实例，调用属性赋值
  tabbars.value?.setCurrentIndex(index)
  // let key = tabbars.value?.id.value
  // key = index
  // currentIndex.value = index
})
</script>

<style lang="less" scoped>
.detail {
  --van-nav-bar-title-text-color: #ff9854;
  .tabs {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;

    img {
      width: 123px;
    }

    .text {
      margin-top: 12px;
      font-size: 12px;
      color: #7688a7;
    }
  }
}
</style>
