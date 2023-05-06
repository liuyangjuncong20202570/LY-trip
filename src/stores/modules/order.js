import { defineStore } from 'pinia'
import { getOrderList } from '@/service'

const useOrder = defineStore('order', {
  state: () => ({
    itemList: []
  }),
  actions: {
    async fetchOrderList(type) {
      const {
        data: {
          data: { orders }
        }
      } = await getOrderList(type)
      this.itemList = orders
    }
  }
})

export default useOrder
