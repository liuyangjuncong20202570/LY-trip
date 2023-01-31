<template>
  <div class="home">
    <homeNavBar></homeNavBar>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <div v-if="isbarShow" class="title-bar">
      <titleBar></titleBar>
    </div>
    <SearchBox></SearchBox>
  </div>
</template>

<script>
export default { name: 'home' }
</script>
<script setup>
import titleBar from '../../components/title-bar/title-bar.vue'
import { ref, watch, computed, onActivated } from 'vue'
import scrollTobuttom from '../../hooks/scrollTobottom/scrollTobuttom'
import homeNavBar from './components/home-nav-bar.vue'
import SearchBox from './components/home-search-box.vue'
// let isbarShow = ref(false)
const { scrollTop } = scrollTobuttom()
// const winTop = computed(() => {
//   if (scrollTop) {
//     return scrollTop.value
//   } else {
//     return 10000
//   }
// })
// console.log(winTop)
// watch(scrollTop, (newTop) => {
//   console.log(newTop)
//   if (newTop > 100) {
//     isbarShow.value = !isbarShow.value
//   }
// })
// 可以使用计算属性来设定isbarshow的值
const isbarShow = computed(() => {
  return scrollTop.value >= 400
})

onActivated(() => {
  window.scrollTop = scrollTop
  // console.log(window)
})
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 50px;
  .banner {
    img {
      width: 100%;
    }
  }
  .title-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
  }
}
</style>
