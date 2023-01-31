<template>
  <div class="facility">
    <div class="facility-inner">
      <detailSection title="房屋设施" more="查看全部设施">
        <template
          v-for="(item, index) in housefacility.houseFacilitys"
          :key="index"
        >
          <div class="item" v-if="housefacility.facilitySort.includes(index)">
            <div class="head">
              <img :src="item.icon" alt="" />
              <div class="text">{{ item.groupName }}</div>
            </div>
            <div class="list">
              <template
                v-for="(item, index) in item.facilitys.slice(0, 4)"
                :key="index"
              >
                <div class="iten">
                  <i class="icon_check icon"></i>
                  <span>{{ item.name }}</span>
                </div>
              </template>
            </div>
          </div>
        </template>
      </detailSection>
    </div>
  </div>
</template>

<script setup>
import detailSection from '../../../components/detail-section/detailSection.vue'
defineProps({
  housefacility: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang="less" scoped>
.facility-inner {
  padding: 5px 0;
  border-radius: 6px;
  font-size: 12px;
  background-color: #f7f9fb;
  .item {
    display: flex;
    margin: 25px 0;
    .head {
      width: 90px;
      text-align: center;
      img {
        width: 20px;
        height: 20px;
        vertical-align: top;
        border-style: none;
      }
      .text {
        margin-top: 5px;
        color: #000;
      }
    }
    .list {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .iten {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 50%;
        margin: 4px 0;
        .icon {
          margin: 0 6px;
        }
      }
    }
  }
}
</style>
