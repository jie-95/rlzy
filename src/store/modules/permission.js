import router, { constantRoutes } from '@/router' // 引入静态路由
import { asyncRouter } from '@/router' // 动态路由
export default {
  namespaced: true,
  state: {
    routes: constantRoutes
  },
  mutations: {
    setRoutes(state, matchRoutes) {
      state.routes = [...constantRoutes, ...matchRoutes]
    }
  },
  actions: {
    // 假设menus 已经拿到了
    // 根据menus里面的 和 asyncRouters动态路由里面 去匹配 真正属于这个用户的权限
    // menus 里面的值是 标识符 code
    filterRoutes({ commit }, menus) {
      const routes = asyncRouter.filter((ele) => menus.includes(ele.meta.id))
      commit('setRoutes', routes)
      router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
    }
  }
}
