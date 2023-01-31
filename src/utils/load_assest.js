// 这个函数是在vite环境下获得动态src地址，第一个参数是当前文件目录相对于目标文件的相对路径
// 第二个参数是当前文件目录
export const getUrlData = (image) => {
  return new URL(`../assets/img/tabbar/${image}`, import.meta.url)
}
