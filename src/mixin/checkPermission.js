import store from '@/store'
export default {
  // created() {
  //   console.log(
  //     '=========',
  //     store.state.user &&
  //       store.state.user.userInfo &&
  //       store.state.user.userInfo.roles &&
  //       store.state.user.userInfo.roles.points
  //   )
  // }
  methods: {
    checkPermission(key) {
      const { userInfo } = store.state.user
      if (userInfo.roles.points && userInfo.roles.points.length) {
        return userInfo.roles.points.some(item => item === key)
      }
      return false
    }
  }
}
