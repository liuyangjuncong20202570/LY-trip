<template>
  <div class="tabbar">
    <template v-for="(item, index) in tabbarItem" :key="index">
      <div class="item">
        <div class="container">
          <span
            :class="{ active: currentIndex === index }"
            @click="tabbarClick(index)"
            class="text"
          >
            {{ item }}
          </span>
          <div :class="{ tabLine: currentIndex === index }"></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'
import { ref } from 'vue'
defineProps({
  tabbarItem: {
    type: Array,
    default: () => []
  }
})

const currentIndex = ref(0)

const emits = defineEmits(['currentIndex'])
const tabbarClick = (index) => {
  currentIndex.value = index
  emits('currentIndex', index)
}
</script>

<style lang="less" scoped>
.tabbar {
  display: flex;
  height: 40px;
  .item {
    width: 125px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
}

.container {
  height: 30px;
  .tabLine {
    margin: 0 auto;
    margin-top: 5px;
    width: 40px;
    height: 2px;
    background: var(--primaryColor);
    border-radius: 3px;
  }
}

.active {
  color: var(--primaryColor);
}
</style>
