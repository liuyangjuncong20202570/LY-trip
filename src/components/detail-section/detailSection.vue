<template>
  <div class="section">
    <div class="header">
      <h2 class="title">{{ title }}</h2>
    </div>
    <div class="content">
      <slot>
        <h3>我是默认内容</h3>
      </slot>
    </div>
    <div class="footer" v-if="more.length">
      <span class="more">{{ more }}</span>
      <van-icon color="#ff9645" name="arrow" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '我是默认标题'
  },
  more: {
    type: String,
    default: ''
  }
})
</script>

<style lang="less" scoped>
.section {
  padding: 0 15px;
  margin-top: 12px;
  border-top: 5px solid #f2f3f4;
  background-color: #fff;
  .header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eee;
    .title {
      font-size: 20px;
      color: #333;
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 44px;
    line-height: 44;
    color: #ff9654;
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
