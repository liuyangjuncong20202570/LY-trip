<template>
  <div class="order-item">
    <div class="top">
      <div class="left">{{ orderItem.unitName }}</div>
      <div class="right">{{ orderItem.orderStatusDesc }}</div>
    </div>
    <div class="center">
      <img :src="orderItem.unitPicture" alt="" class="avatar" />
      <div class="desc">
        <div class="left">
          <div class="time">
            <div class="start">{{ startDay }}</div>
            <div class="week">
              {{ getFormDay(orderItem.checkInDate)
              }}{{ orderItem.checkInLatestTime }}
            </div>
          </div>
          <div class="toward">
            <img
              class="img_toward"
              src="../../../assets/img/order/icon_right_orderlist.png"
              alt=""
            />
          </div>
          <div class="time">
            <div class="start">{{ endDay }}</div>
            <div class="week">
              {{ getFormDay(orderItem.checkOutDate)
              }}{{ orderItem.checkOutLatestTime }}
            </div>
          </div>
        </div>
        <div class="right">
          <span class="title">支付总价</span>
          <span class="pay">￥{{ orderItem.prepayAmount }}</span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="left">
        <div v-if="orderItem.orderStatus === 1" class="left_content">
          <img
            class="icon-time"
            src="@/assets/img/order/icon-time.png"
            alt=""
          />
          <span class="countdown">{{ remainning }}分</span>
          <span>{{ orderItem.summary }}</span>
        </div>
      </div>
      <div class="right">
        <van-button type="primary">联系房东</van-button>
        <van-button type="primary">去支付</van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { formatMonthDay } from '../../../utils/formatTime.js'
const props = defineProps({
  orderItem: {
    type: Object,
    default: () => ({})
  }
})

const startDay = computed(() => formatMonthDay(props.orderItem.checkInDate))
const endDay = computed(() => formatMonthDay(props.orderItem.checkOutDate))

const getFormDay = computed(() => {
  return (dateString) => {
    // console.log(dateString)
    let date = new Date(dateString)
    return '周' + '日一二三四五六'.charAt(date.getDay())
  }
})

let counter = 1

let remainning = ref(0)

const shutDown = () => {
  remainning.value = Math.floor(parseInt(props.orderItem.countdown) / 60)
  let interval = setInterval(() => {
    // console.log(numTime)
    remainning.value = parseInt(remainning.value - counter)
    if (remainning.value <= 0) {
      clearInterval(interval)
      return
    }
  }, 60000)
}

onMounted(() => {
  shutDown()
})
</script>

<style lang="less" scoped>
.order-item {
  padding: 10px 25px 50px;
  .top {
    display: flex;
    justify-content: space-between;
    .left {
      width: 60%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .right {
      display: flex;
      width: 40%;
      font-size: 18px;
      color: var(--primaryColor);
      justify-content: flex-end;
    }
  }

  .center {
    position: relative;
    margin-top: 10px;
    width: 336px;
    border-radius: 6px;
    overflow: hidden;
    .avatar {
      width: 336px;
    }
    .desc {
      height: 60px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(9, 10, 14, 0.7);
      display: flex;
      color: #fff;
      align-items: center;
      padding: 5px 20px;
      justify-content: space-between;
      .left {
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .toward {
          .img_toward {
            width: 16px;
            height: 12px;
          }
        }
        .time {
          .start {
            font-size: 16px;
          }
          .week {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #f7f8fb;
            font-size: 12px;
            opacity: 0.8;
          }
        }
      }
      .right {
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &::before {
          content: '';
          position: absolute;
          right: 130px;
          width: 1.5px;
          height: 40px;
          background-color: white;
        }
        .title {
          color: #f7f8fb;
          opacity: 0.8;
        }
        .pay {
          color: var(--primaryColor);
          font-size: 16px;
        }
      }
    }
  }

  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    .left {
      .left_content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .icon-time {
          width: 11px;
          height: 11px;
          margin-right: 3px;
        }
      }
    }
  }
}
</style>
