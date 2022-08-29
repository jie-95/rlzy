<template>
  <div class="dashboard-container">
    <div class="dashboard-text">dashboard: {{ name }}</div>
    <a
      href="http://localhost:6868/static/img/login-logo.758b34e9.png"
      download="login-logo.758b34e9.png"
    >点击</a>
    <UploadImg @onSuccess="handelSuccess" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadImg from '@/components/ImageUpload'

export default {
  name: 'Dashboard',
  // direactives 局部注册自定义指令
  // directives: {S
  //   // key: value
  //   // key 自定义指令的名称
  //   // value ==》 自定义指令对应的逻辑
  //   color: {
  //     inserted(dom, options, vNode) {
  //       console.log(dom) // dom 指令绑定的元素
  //       console.log(options) // 描述 当前指令信息
  //       console.log(vNode.context) // 可以访问到 当前vue实例的
  //       // 实现 改 当前 dom 元素颜色
  //       dom.style.color = options.value
  //     }
  //   }
  // },
  components: {
    UploadImg
  },
  data() {
    return {
      info: {}
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    // 自定义图片上传规则
    // beforeUploadCheck() {
    // this.$message.error('asdaa')
    // return true
    // },
    handelSuccess({ url }) {
      console.log(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
