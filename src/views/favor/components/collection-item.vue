<template>
  <div class="collectionItem">
    <div class="top">
      <img class="top-img" :src="itemList.pictureList[0]" alt="" />
      <div class="recommand">
        <div class="msg-tip">
          <span class="score">{{ itemList.commentBrief.overall }}分</span>
          <span class="answer">{{ itemList.commentBrief.commentBrief }}</span>
        </div>
      </div>
      <div class="tool-bar">
        <img class="avatar" :src="itemList.logoUrl" alt="" />
        <div class="like">
          <img class="like-o" src="../../../assets/img/favor/like.png" alt="" />
        </div>
        <div class="message">
          <img class="msg-img" src="@/assets/img/favor/comment.png" alt="" />
          <span>{{ itemList.commentBrief.totalCount }}</span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="list-title">
        <div class="info">
          <van-tag
            class="ellipsis text-1"
            text-color="white"
            color="rgb(63,73,84)"
            type="primary"
            >{{ itemList.address }}</van-tag
          >
          <span class="name">{{ unitData.unit }}</span>
          <span class="desc">{{ unitData.unitDesc }}</span>
        </div>
        <div class="title ellipsis text-2">{{ itemList.unitName }}</div>
      </div>
      <div class="list-bottom">
        <div class="tags">
          <template v-for="(item, index) in itemList.houseTags" :key="index">
            <van-tag
              class="vanTags"
              color="rgba(255,102,102,0.1)"
              text-color="rgb(255,102,102)"
              >{{ item.text }}</van-tag
            >
          </template>
        </div>
        <div class="price">
          <span class="real-price">{{ itemList.finalPrice }}</span>
          <span class="old-price">{{ itemList.productPrice }}</span>
          <van-tag
            v-if="itemList.priceTipBadge"
            round
            color="#FFFFFF"
            :style="{ backgroundImage: 'linear-gradient(#FF6666, #FB4A4A)' }"
          >
            <i class="icon-unit-sound"></i>
            {{ itemList.priceTipBadge.text }}
          </van-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, computed, ref } from 'vue'
const props = defineProps({
  itemList: {
    type: Object,
    default: () => ({})
  }
})

const titleData = ref({})
watch(
  () => props.itemList,
  (newValue) => {
    titleData.value = newValue
  },
  {
    immediate: true
  }
)

const unitData = computed(() => {
  let data = titleData.value
  return {
    unit: data.unitSummeries[0]?.text,
    unitDesc: data.unitSummeries[1]?.text
  }
})
</script>

<style lang="less" scoped>
.collectionItem {
  margin: 0 auto;
  width: 336px;
  .top {
    margin-top: 15px;
    position: relative;
    img {
      vertical-align: top;
    }
    .top-img {
      width: 100%;
      height: 224px;
      border-radius: 6px;
      margin-bottom: 7px;
    }
    .recommand {
      position: absolute;
      left: 10px;
      right: 10px;
      bottom: 15px;
      .msg-tip {
        padding: 0 8px;
        line-height: 17px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        max-width: 55%;
        height: 17px;
        // padding-left: 6px;
        border-radius: 10px;
        background-color: hsla(0, 0%, 100%, 0.9);
        .score {
          transform: scale(0.8);
          transform-origin: 0 center;
          color: #333;
        }
        .answer {
          position: relative;
          font-size: 12px;
          transform: scale(0.8);
          transform-origin: 0 center;
          margin-left: -2px;
          padding-left: 5px;
          color: #666;
          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 2px;
            height: 10px;
            width: 1px;
            background-color: #dadada;
          }
        }
      }
    }
    .tool-bar {
      position: absolute;
      right: 10px;
      top: 10px;
      display: flex;
      flex-direction: column;
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-top: 5px;
      }
      .like {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        .like-o {
          width: 30px;
          height: 30px;
        }
      }
      .message {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        .msg-img {
          height: 30px;
          height: 30px;
        }
        span {
          color: white;
        }
      }
    }
  }
  .bottom {
    .list-title {
      .info {
        display: flex;
        align-items: center;
        font-size: 12px;
        white-space: nowrap;
        color: #666;
        .name {
          position: relative;
          margin-left: 10px;
          margin-right: 10px;
        }
      }
      .title {
        font-size: 18px;
        font-weight: 500;
        margin-top: 8px;
        line-height: 22px;
        margin-bottom: 5px;
      }
    }
    .list-bottom {
      .vanTags {
        margin-right: 6px;
      }
      .price {
        margin-top: 3px;
        margin-bottom: 7px;
        .real-price {
          position: relative;
          top: 1px;
          color: var(--primaryColor);
          font-size: 20px;
          padding-right: 10px;
          padding-left: 1px;
          &::before {
            content: '￥';
            font-size: 14px;
            padding-right: 3px;
          }
        }
        .old-price {
          font-weight: 500;
          font-size: 12px;
          color: #999;
          text-decoration: line-through;
          padding-right: 5px;
        }
        .icon-unit-sound {
          margin-right: 5px;
          display: inline-block;
          width: 10px;
          height: 10px;
          background-image: url(https://fe.tujiacdn.com/pwa/static/fevueui/images/unit-item-m/icon-unit-sound.png);
          background-size: 10px 10px;
          background-repeat: no-repeat;
          background-position: 50%;
        }
      }
    }
  }
}
</style>
