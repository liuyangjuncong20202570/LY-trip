<template>
  <div v-if="mainStore.isLoading" class="loading">
    <div class="bg">
      <img src="@/assets/img/home/full-screen-loading.gif" alt="" />
    </div>
  </div>
</template>

<script setup>
import useMain from '../../stores/modules/main'

const mainStore = useMain()
</script>

<style lang="less" scoped>
.loading {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  .bg {
    width: 104px;
    height: 104px;
    display: flex;
    align-items: center;
    justify-content: center;
    // background:image,position,size
    background: url('@/assets/img/home/loading-bg.png') 0 0 / 100% 100%;
    img {
      width: 70px;
      height: 70px;
      margin-bottom: 8px;
    }
  }
}
</style>
