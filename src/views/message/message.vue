<template>
  <div class="message">
    <img src="@/assets/img/message/icon_message.png" alt="" />
    <div>暂无消息</div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.message {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 88%;
  }
}
</style>
