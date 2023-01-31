<template>
  <div class="map">
    <detailSection title="位置周边" more="查看更多周边信息">
      <div class="baidu" ref="mapBaidu"></div>
    </detailSection>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import detailSection from '../../../components/detail-section/detailSection.vue'
const mapBaidu = ref()
const props = defineProps({
  position: {
    type: Object,
    default: () => ({})
  }
})
onMounted(() => {
  const map = new BMapGL.Map(mapBaidu.value) // 创建地图实例
  const point = new BMapGL.Point(
    props.position.longitude,
    props.position.latitude
  ) // 创建点坐标
  map.centerAndZoom(point, 15) // 初始化地图，设置中心点坐标和地图级别
  map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
  map.setHeading(64.5) //设置地图旋转角度
  map.setTilt(73) //设置地图的倾斜角度
  const marker = new BMapGL.Marker(point) // 创建标注
  map.addOverlay(marker) // 将标注添加到地图中
})
</script>

<style lang="less" scoped>
.baidu {
  height: 250px;
}
</style>
