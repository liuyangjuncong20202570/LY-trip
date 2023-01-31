<template>
  <div id="app">
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
    <tabbar v-show="!route.meta.hiddenBox"></tabbar>
    <loading></loading>
  </div>
</template>

<script setup>
import loading from './components/loading/loading.vue'
import tabbar from '@/components/tabbar/tab-bar.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style lang="less" scoped></style>
