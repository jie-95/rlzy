// import PageTools from './PageTools'

// export default (Vue) => {
//   Vue.component('PageTools', PageTools)
// }
// const requireComponent = require.context('路径', 布尔值·是否找子组件·, /\.vue$/·正则·)
const requireComponent = require.context('./', true, /\.vue$/)
// const list = requireComponent.keys().map((ele) => requireComponent(ele))
const list = requireComponent.keys().map(requireComponent)
// console.log(requireComponent.keys())
export default (Vue) => {
  list.forEach((ele) => {
    // Vue.component(组件名称, 组件对象)

    Vue.component(ele.default.name, ele.default)
  })
}
