import { defineStore } from 'pinia'
// 定义全局共享数据
const nowdate = new Date()
// 获取明天的时间的方法时在nowdate的基础上再加上一天的毫秒数（因为getTime()这个方法返回的是毫秒数）
const newdate = new Date().getTime() + 24 * 60 * 60 * 1000
const useMain = defineStore('main', {
  state: () => ({
    newdate,
    nowdate,
    isLoading: false
  })
})

export default useMain
