<template>
  <div class="infos">
    <div class="name">{{ topInfos.houseName }}</div>
    <div class="tags">
      <template v-for="(item, index) in topInfos.houseTags" :key="index">
        <span
          class="item"
          v-if="item.tagText"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color
          }"
        >
          {{ item.tagText.text }}
        </span>
      </template>
    </div>
    <div class="comment">
      <div class="left">
        <span class="score">{{ topInfos.commentBrief.overall }}</span>
        <span class="title">{{ topInfos.commentBrief.scoreTitle }}</span>
        <span class="brief">{{ topInfos.commentBrief.commentBrief }}</span>
      </div>
      <div class="right">
        <span class="count">{{ topInfos.commentBrief.totalCount }}条评论</span>
        <van-icon color="#ff9645" name="arrow" />
      </div>
    </div>
    <div class="comment location">
      <div class="left">
        <span class="address">{{ topInfos.nearByPosition.address }}</span>
      </div>
      <div class="right">
        <span class="map">地图·周边</span>
        <van-icon color="#ff9645" name="arrow" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import useDetail from '@/stores/modules/detail.js'
const detailStore = useDetail()
const { detailData } = storeToRefs(detailStore)
const topInfos = detailData.value.mainPart.topModule
</script>

<style lang="less" scoped>
.infos {
  padding: 16px;
  background-color: #fff;
  .name {
    font-weight: 700;
    font-size: 20px;
    text-align: justify;
    line-height: 24px;
    overflow: hidden;
    margin-bottom: 6px;
  }
  .tags {
    margin: 10px 0;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-around;
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      margin: 0 2px;
      padding: 1px 3px;
    }
  }
  .comment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    margin: 12px 0;
    border-radius: 5px;
    font-size: 12px;
    background-color: #f5f7fa;
    .left {
      .score {
        font-size: 18px;
        font-weight: 700;
        color: #333;
      }
      .title {
        color: #333;
        font-weight: 700;
        margin: 0 3px;
      }
      .brief {
        color: #666;
      }
    }
    .right {
      .count {
        color: #ff9645;
      }
    }
  }
  .location {
    .left {
      .address {
        font-size: 14px;
        font-weight: 700;
        color: #333;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
      }
    }
    .right {
      color: #ff9645;
    }
  }
}
</style>
