<template>
  <div class="home-item">
    <div class="home-inner">
      <div class="cover">
        <img :src="itemData?.image?.url" alt="" />
      </div>
      <div class="info">
        <div class="location">
          <img src="@/assets/img/home/location.png" alt="" />
          <span>{{ itemData?.location }}</span>
        </div>
        <div class="name">{{ itemData?.houseName }}</div>
        <div class="summary">{{ itemData?.summaryText }}</div>
        <div class="price">
          <div class="new">￥{{ itemData?.finalPrice }}</div>
          <div class="old">￥{{ itemData?.productPrice }}</div>
          <div class="tip">{{ itemData?.priceTipBadge?.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang="less" scoped>
.home-item {
  width: 50%;
  .home-inner {
    margin: 5px;
    background: #fff;
    overflow: hidden;
    border-radius: 6px;
  }
  img {
    width: 100%;
  }
  .info {
    padding: 8px 10px;
    color: #333;
    .location {
      color: #999;
      img {
        width: 15px;
        height: 15px;
      }
    }
    .summary {
      font-size: 12px;
      color: #999;
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
      margin-top: 5px;
      .new {
        color: #ff9645;
        font-size: 14px;
      }

      .old {
        margin: 0 3px;
        color: #999;
        font-size: 12px;
        text-decoration: line-through;
      }

      .tip {
        background-image: linear-gradient(270deg, #f66, #ff9f9f);
        color: #fff;
        padding: 0 6px;
        border-radius: 8px;
      }
    }
  }
}
</style>
