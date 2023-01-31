import { defineStore } from 'pinia'
import { getDetailinfos } from '@/service'
const useDetail = defineStore('detail', {
  state: () => ({
    detailData: {}
  }),
  actions: {
    async getDetail(val) {
      const { data } = await getDetailinfos(val)
      this.detailData = data
    }
  }
})

export default useDetail
