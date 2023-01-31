<template>
  <div class="tabbar">
    <div
      v-for="(item, index) in item"
      :key="item"
      :class="{ active: index === id }"
      class="item"
      @click="changeChannel(index, item)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, computed } from 'vue'
let id = ref(0)
const props = defineProps({
  item: {
    type: Array,
    required: true
  }
  // currentIndex: {
  //   type: Number,
  //   default: 0
  // },
  // isClick: {
  //   type: Boolean,
  //   default: false
  // }
})
const setCurrentIndex = (index) => {
  id.value = index
}
defineExpose({
  id,
  setCurrentIndex
})

// let isClick = ref(false)
// // const isClick = ref(false)
// // id.value = toRefs(props.currentIndex)
// const { currentIndex } = toRefs(props)
// 此处赋值不产生效果是因为setup中只会渲染第一次，即使数据是响应式的，setup中不会更新数据，响应式针对的是template模板中的数据
// 如果要使用动态数据，需要依赖计算属性，如下所示
// const test = computed(() => {
//   // if (isClick.value) {
//   //   return id.value
//   // } else {
//   //   id.value = currentIndex.value
//   //   return id.value
//   // }
//   return (id.value = currentIndex.value)
// })

// const key = computed(() => {
//   if (isClick.value) {
//     isClick = false
//     return id.value
//   } else {
//     return test
//   }
// })
// console.log(test)
// console.log(currentIndex.value)
const emits = defineEmits(['changeChannel'])
const changeChannel = (index, item) => {
  emits('changeChannel', { index, item })
  // isClick.value = true
  id.value = index
}
// export default {
//   emits: ['changeChannel'],
//   data() {
//     return {
//       id: 1
//     }
//   },
//   props: {
//     item: {
//       type: Array,
//       required: true
//     }
//   },
//   methods: {
//     changeChannel(val1, val2) {
//       this.$emit('changeChannel', val1)
//       this.id = val2
//     }
//   }
// }
</script>

<style lang="less" scoped>
.tabbar {
  background-color: #fff;
  display: flex;
  height: 44px;
  line-height: 44px;
}
.item {
  flex: 1;
  text-align: center;
}
.active {
  color: var(--primaryColor);
}
.active span {
  padding: 8px;
  border-bottom: 3px solid var(--primaryColor);
}
</style>
