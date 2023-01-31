import { defineStore } from 'pinia'
import { getCityAll, getLocation } from '../../service'

const useCity = defineStore('city', {
  state: () => ({
    allCitydata: {},
    // 为防止刚开始进入页面时获取不到对应的城市，可以设定一个初始值
    currentCity: { cityName: '广州' },
    cityLocation: ''
  }),
  actions: {
    async getCityData() {
      const { data } = await getCityAll()
      this.allCitydata = data
    },
    async getCityLocation() {
      const data = await getLocation()
      this.cityLocation = data
    }
  }
})

export default useCity
