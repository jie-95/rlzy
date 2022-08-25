import { login, getUserInfo, getUuserDetailById } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {},
    HrsaasTime: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    removeToken(state) {
      state.token = null
      removeToken()
    },
    setUserInfo(state, userInfo) {
      state.userInfo = JSON.parse(JSON.stringify(userInfo))
    },
    removeUserInfo(state) {
      state.userInfo = {}
    },
    setHrsaasTime(state, time) {
      state.HrsaasTime = time
    }
  },
  actions: {
    // 通过接口获取token
    async login({ commit }, data) {
      const res = await login(data)
      // console.log(res)
      commit('setHrsaasTime', +new Date())
      commit('setToken', res)
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      // console.log(res)

      // 获取用户图片
      const baseInfo = await getUuserDetailById(res.userId)

      const baseResult = { ...res, ...baseInfo }
      commit('setUserInfo', baseResult)
      return res
    },
    logout({ commit }) {
      commit('removeToken')
      commit('removeUserInfo')
    }
  }
}
