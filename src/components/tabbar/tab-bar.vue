<template>
  <div class="tabbar">
    <!-- <template v-for="(item, index) in content" :key="item.text">
      <tabbarItem
        :class="{ active: index === currentIndex }"
        :content="item"
        :index="index"
        :currentIndex="currentIndex"
        @click="changePath(item.path, index)"
      ></tabbarItem>
    </template> -->
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <van-tabbar-item
        :to="item.path"
        v-for="(item, index) in content"
        :key="item.text"
        :class="{ active: index === currentIndex }"
      >
        <span>{{ item.text }}</span>
        <template #icon>
          <img
            v-if="index === currentIndex"
            :src="getUrlData(item.imgActive)"
            alt=""
          />
          <img v-else :src="getUrlData(item.src)" alt="" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
// import tabbarItem from './tabar-item.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import content from '../../assets/data/tabbar_data'
import { getUrlData } from '../../utils/load_assest'
let currentIndex = ref(0)
const route = useRoute()
// 通过监听器，手动更新currentIndex绑定的值，通过content去找现在所处路由和数据中路由相吻合的索引，将该索引传给currentIndex
watch(route, (newRoute) => {
  const index = content.findIndex((item) => item.path === newRoute.path)
  if (index === -1) return
  currentIndex.value = index
})
</script>

<style lang="less" scoped>
.tabbar {
  // --van-tabbar-item-font-size:30px 同样可以通过更改相对应的css变量的方式更改样式
  &.active {
    color: var(--primaryColor);
  }
  // 加入要更改子组件内部的属性样式，需要使用:deep()函数
  // 因为父子组件之间都存在scoped自己的样式作用域
  // :deep(.van-tabbar-item__icon) {
  //   font-size: 30px;
  // }
  // 如果使用了插槽可以直接通过更改自己作用域下的元素属性样式进行更改
  img {
    height: 26px;
  }
}
</style>
