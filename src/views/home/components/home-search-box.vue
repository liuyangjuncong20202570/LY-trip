<template>
  <div class="search">
    <div class="location">
      <div class="city" @click="searchCity">
        {{ cityStore.currentCity.cityName }}
      </div>
      <div class="position" @click="getPosition">
        <span>我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="section date-range" @click="showCalander">
      <div class="start">
        <span class="tip">入住</span>
        <span class="time">{{ today }}</span>
      </div>
      <div class="stay">共{{ night }}晚</div>
      <div class="leave">
        <span class="tip">离店</span>
        <span class="time">{{ tomorrow }}</span>
      </div>
    </div>
    <van-calendar
      color="#ff9854"
      :round="false"
      v-model:show="isCalandershow"
      type="range"
      :formatter="formatter"
      @confirm="onConfirm"
    />
    <!-- 价格/人数/关键字 -->
    <div class="section price-count">
      <div class="start">价格不限</div>
      <div class="stay"></div>
      <div class="leave">人数不限</div>
    </div>
    <div class="section keyword">关键字/位置/民宿名</div>
    <!-- /价格/人数/关键字 -->
    <!-- /日期范围 -->

    <!-- 热门推荐 -->
    <div class="section hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div
          class="item"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color
          }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>
    <!-- /热门推荐 -->
    <!-- 搜索框 -->
    <div class="section search-box" @click="searchBtn">
      <div class="search-btn">开始搜索</div>
    </div>
    <!-- /搜索框 -->
    <!-- 推荐类别 -->
    <homeCatagories></homeCatagories>
    <!-- /推荐类别 -->
    <!-- 数据列表 -->
    <homeContent></homeContent>
    <!-- /数据列表 -->
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import homeContent from './home-content.vue'
import useMain from '../../../stores/modules/main'
import useCity from '../../../stores/modules/city'
import useHome from '../../../stores/modules/home'
import homeCatagories from './home-catagories.vue'
import { formatMonthDay, getDiffDay } from '../../../utils/formatTime'

const cityStore = useCity()
const homeStore = useHome()
const router = useRouter()
const getPosition = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log(res)
    },
    (err) => {
      console.log('获取位置失败', err)
    },
    {
      timeout: 3000
    }
  )
}

// 日期
let isCalandershow = ref(false)
// const nowdate = new Date()
// 获取明天的时间的方法时在nowdate的基础上再加上一天的毫秒数（因为getTime()这个方法返回的是毫秒数）
// const newdate = new Date().getTime() + 24 * 60 * 60 * 1000
// getDate()这个方法直接返回一月中具体的某一天要加一天直接加一就可以
// const newdate = new Date()
// newdate.setDate(newdate.getDate()+1)
// console.log(newdate)
const mainStore = useMain()
const { newdate, nowdate } = storeToRefs(mainStore)
const today = computed(() => formatMonthDay(nowdate.value))
const tomorrow = computed(() => formatMonthDay(newdate.value))
let night = computed(() => getDiffDay(nowdate.value, newdate.value))

const searchCity = () => {
  router.push('/city')
}

const showCalander = () => {
  isCalandershow.value = true
}

const formatter = (day) => {
  if (day.type === 'start') {
    day.bottomInfo = '入住'
  } else if (day.type === 'end') {
    day.bottomInfo = '离店'
  }

  return day
}

const onConfirm = (value) => {
  isCalandershow.value = false
  mainStore.nowdate = value[0]
  mainStore.newdate = value[1]
  night.value = getDiffDay(value[0], value[1])

  // console.log(getDiffDay(value[0], value[1]))
}

// 热门推荐
homeStore.getSuggests()
const { hotSuggests } = storeToRefs(homeStore)
// 热门推荐

// 搜索框跳转
const { currentCity } = storeToRefs(cityStore)
const searchBtn = () => {
  router.push({
    path: '/search',
    query: {
      today: today.value,
      tomorrow: tomorrow.value,
      currentCity: currentCity.value.cityName
    }
  })
}
</script>

<style lang="less" scoped>
.search {
  --van-calendar-popup-height: 100%;
  .location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;
    .city {
      flex: 1;
      color: #333;
    }
    .position {
      display: flex;
      align-items: center;
      width: 80px;
      color: #666;
      img {
        position: relative;
        top: -1px;
        width: 16px;
        height: 16px;
        padding-left: 6px;
      }
    }
  }
  .section {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    color: #999;
    padding: 0, 20px;
    height: 44px;
    .start {
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      flex: 1;
    }

    .stay {
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      flex: 1;
    }

    .leave {
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      flex: 1;
    }
    .tip {
      font-size: 12px;
      color: #999;
    }
    .time {
      margin-top: 5px;
      font-size: 15px;
      font-weight: 500;
      color: #333;
    }
  }
}
.keyword {
  padding-left: 20px;
  height: 44px;
}

.hot-suggests {
  padding-left: 20px;
  height: auto !important;
  .item {
    padding: 4px 8px;
    margin: 3px;
    border-radius: 14px;
    font-size: 12px;
  }
}
.search-box {
  justify-content: center;
  margin-top: 10px;
  // margin-top: 50px;
  .search-btn {
    width: 342px;
    height: 38px;
    color: #fff;
    font-size: 18px;
    max-height: 50px;
    font-weight: 500;
    line-height: 38px;
    border-radius: 20px;
    text-align: center;
    background-image: var(--theme-linear-gradient);
  }
}
</style>
