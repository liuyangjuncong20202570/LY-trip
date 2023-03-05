<template>
  <div class="landlord">
    <div class="no-data">
      <img
        class="icon-no-data"
        src="@/assets/img/favor/empty_favorite.44731802.png"
        alt=""
      />
      <div class="name">暂无收藏</div>
      <div class="desc">
        点击
        <img src="@/assets/img/favor/favor.png" alt="" />
        即可收藏对应的房东
      </div>
      <button @click="jumpTo" class="btn">随便去逛逛</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const jumpTo = () => {
  router.push('/home')
}
</script>

<style lang="less" scoped>
.landlord {
  .no-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon-no-data {
      width: 100%;
    }
    .name {
      color: #333;
      font-size: 18px;
      font-weight: 500;
      line-height: 27px;
    }
    .desc {
      color: #666;
      line-height: 18px;
      font-size: 14px;
      margin: 7px auto 36px;
      img {
        position: relative;
        top: 4px;
        width: 12px;
        vertical-align: top;
      }
    }
    .btn {
      padding: 0 38px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: #fff;
      background-color: var(--primaryColor);
      border-radius: 20px;
      border: none;
      outline: none;
    }
  }
}
</style>
