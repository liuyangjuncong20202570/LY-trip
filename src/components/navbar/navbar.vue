<template>
  <div class="navbar">
    <div class="left">
      <van-icon size="20" name="arrow-left" />
      <slot name="leftwrite">
        <span></span>
      </slot>
    </div>
    <div class="content">
      <slot name="content"> 我是标题 </slot>
    </div>
    <div class="right">
      <van-icon size="20" name="wap-nav" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.navbar {
  height: 46px;
  display: flex;
  padding: 0 15px;
  color: var(--primaryColor);
  align-items: center;
  background-color: #fff;
  justify-content: space-between;
  .left {
    width: 80px;
    display: flex;
    align-items: center;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right {
    display: flex;
    width: 80px;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
