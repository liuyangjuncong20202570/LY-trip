<template>
  <div class="home-item">
    <div class="home-inner">
      <div class="cover">
        <img :src="itemData?.image?.url" alt="" />
      </div>
      <div class="info">
        <div class="summary">{{ itemData?.summaryText }}</div>
        <div class="name">{{ itemData?.houseName }}</div>
        <div class="price">
          <van-rate
            :model-value="itemScore"
            color="#fff"
            allow-half
            size="15"
            readonly
          />
          <div class="new">￥{{ itemData?.finalPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
})

const itemScore = computed(() => {
  return Number(props.itemData.commentScore)
})
</script>

<style lang="less" scoped>
.home-item {
  width: 50%;
  .home-inner {
    position: relative;
    margin: 5px;
    background: #fff;
    overflow: hidden;
    border-radius: 6px;
  }
  img {
    width: 100%;
  }
  .info {
    position: absolute;
    bottom: 0;
    padding: 8px 10px;
    color: #fff;
    .summary {
      font-size: 12px;
    }
    .name {
      margin: 5px 0;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .price {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
  }
}
</style>
