import { defineStore } from 'pinia'
import { getIteminfo, getHistory } from '@/service'

const useFavor = defineStore('favor', {
  state: () => ({
    itemList: [],
    historyList: []
  }),
  actions: {
    async getItem() {
      const {
        data: {
          data: { items }
        }
      } = await getIteminfo()
      this.itemList = items || []
    },

    async getHistoryList() {
      const {
        data: {
          data: { items }
        }
      } = await getHistory()
      this.historyList = items || []
    }
  }
})

export default useFavor
