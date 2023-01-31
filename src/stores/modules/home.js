import { defineStore } from 'pinia'
import { gethotSuggests, getCatagorise, getList } from '@/service'
const useHome = defineStore('home', {
  state: () => ({
    hotSuggests: [],
    catagories: [],
    currentPage: 1,
    homeLists: []
  }),
  actions: {
    async getSuggests() {
      const { data } = await gethotSuggests()
      this.hotSuggests = data
    },
    async getCatagoriesData() {
      const { data } = await getCatagorise()
      this.catagories = data
    },
    async getHomeLists() {
      const { data } = await getList(this.currentPage)
      this.homeLists.push(...data)
      this.currentPage++
    }
  }
})

export default useHome
