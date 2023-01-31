// 封装成类
// class scrollTobuttom {
//   scrollTobuttom = (val) => {
//     window.addEventListener('scroll', () => {
//       const scrollTop = document.documentElement.scrollTop
//       const scrollHeight = document.documentElement.scrollHeight
//       const clientHeight = document.documentElement.clientHeight
//       console.log('-------')
//       console.log(clientHeight, scrollTop, scrollHeight)
//       if (scrollHeight <= Math.ceil(scrollTop) + clientHeight) {
//         console.log('滚动到底部了')
//         console.log(val)
//         if (typeof val === 'function') {
//           val()
//         }
//       }
//     })
//   }
// }

// export default new scrollTobuttom()

// 封装成钩子函数
import { throttle } from 'underscore'
import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue'
// export default function scrollTobuttom(val) {
//   const scrollHandler = () => {
//     const scrollTop = document.documentElement.scrollTop
//     const scrollHeight = document.documentElement.scrollHeight
//     const clientHeight = document.documentElement.clientHeight
//     if (scrollHeight <= Math.ceil(scrollTop) + clientHeight) {
//       val()
//     }
//   }
//   onMounted(() => {
//     window.addEventListener('scroll', scrollHandler)
//   })
//   onUnmounted(() => {
//     window.removeEventListener('scroll', scrollHandler)
//   })
// }
// 思路二：通过传递一个布尔值来判断当前是否到达底部
// 为了让这个钩子函数更具有复用性，需要对该函数进行赋值来确定监听哪个个容器的滚动，而不是只监听window容器的滚动
// export default function scrollTobuttom() {
//   const scrollTop = ref(0)
//   const scrollHeight = ref(0)
//   const clientHeight = ref(0)
//   const isReachbottom = ref(false)
//   // 使用throttle函数进行节流处理
//   const scrollHandler = throttle(() => {
//     scrollTop.value = document.documentElement.scrollTop
//     scrollHeight.value = document.documentElement.scrollHeight
//     clientHeight.value = document.documentElement.clientHeight
//     if (scrollHeight.value <= Math.ceil(scrollTop.value) + clientHeight.value) {
//       isReachbottom.value = true
//     }
//   }, 100)
//   onMounted(() => {
//     window.addEventListener('scroll', scrollHandler)
//   })
//   onUnmounted(() => {
//     window.removeEventListener('scroll', scrollHandler)
//   })
//   return {
//     isReachbottom,
//     clientHeight,
//     scrollHeight,
//     scrollTop
//   }
// }
export default function scrollTobuttom(elRef) {
  let el = window
  const scrollTop = ref(0)
  const scrollHeight = ref(0)
  const clientHeight = ref(0)
  const isReachbottom = ref(false)
  // 使用throttle函数进行节流处理
  const scrollHandler = throttle(() => {
    // console.log('正在滚动')
    if (el === window) {
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
      clientHeight.value = document.documentElement.clientHeight
    } else {
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
      clientHeight.value = el.clientHeight
    }
    // console.log(scrollTop, scrollHandler, clientHeight)
    if (scrollHeight.value <= Math.ceil(scrollTop.value) + clientHeight.value) {
      isReachbottom.value = true
      // console.log('到达底部')
    }
  }, 100)
  onMounted(() => {
    // 注意，在传递时，dom参数必须直接传递ref对象，否则会失去相应式，所以即使当页面进行到onMounted生命周期函数时，由于失去了相应式
    // 获取的值也是undefined，并且如果通过默认参数设定elRef=window，也需要一个参数来接受当elRef接受Dom的ref对象的值（elRef.value）
    // 所以一开始就使用el来进行滚动监听
    if (elRef) el = elRef.value
    el.addEventListener('scroll', scrollHandler)
  })
  onUnmounted(() => {
    el.removeEventListener('scroll', scrollHandler)
  })

  onActivated(() => {
    if (elRef) el = elRef.value
    el.addEventListener('scroll', scrollHandler)
  })
  onDeactivated(() => {
    el.removeEventListener('scroll', scrollHandler)
  })
  return {
    isReachbottom,
    clientHeight,
    scrollHeight,
    scrollTop
  }
}
