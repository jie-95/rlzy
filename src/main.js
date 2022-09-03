import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 自定义事件
import * as directives from '@/directives'
// 注册自定义指令
// 遍历所有的导出的指令对象 完成自定义全局注册

Object.keys(directives).forEach((key) => {
  // 注册自定义指令
  Vue.directive(key, directives[key])
})
// 全局注册
import components from '@/components'
Vue.use(components)

// 注册全局过滤器
import * as filters from '@/filters'
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
Vue.use(ElementUI)
// 注册打印组件
import Print from 'vue-print-nb'
Vue.use(Print)

Vue.config.productionTip = false
import myMixin from '@/mixin/checkPermission'
Vue.mixin(myMixin)

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
