<template>
  <div class="app-container">
    <el-card>
      <el-tabs>
        <el-tab-pane label="登录账户设置">
          <!-- 放置表单 -->
          <el-form
            ref="userInfo"
            label-width="120px"
            style="margin-left: 120px; margin-top: 30px"
            :loading="loading"
            :model="userInfo"
            :rules="rules"
          >
            <el-form-item label="姓名:" prop="username">
              <el-input v-model="userInfo.username" style="width: 300px" />
            </el-form-item>
            <el-form-item label="密码:" prop="password2">
              <el-input
                v-model="userInfo.password2"
                style="width: 300px"
                type="password"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="upDateInfo">更新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="个人详情">
          <userInfo ref="userInfoRef" />
        </el-tab-pane>
        <el-tab-pane label="岗位信息">
          <jobInfo />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import userInfo from './components/userInfo.vue'
import jobInfo from './components/jobInfo.vue'
import { getUserDetailById, saveUserDetailById } from '@/api/employees'
export default {
  components: { userInfo, jobInfo },
  data() {
    return {
      loading: false,
      userInfo: {
        //   专门存放基本信息
        username: '',
        password: '',
        password2: ''
      },
      rules: {
        username: [{ required: true, message: '用户名必填', trigger: 'blur' }],
        password2: [
          { required: true, message: '密码必填', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度为6-9位', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    getId() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.getUserDetailById()
  },
  methods: {
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.getId)
      this.$refs.userInfoRef.userInfo = { ...this.userInfo }
    },
    async upDateInfo() {
      this.loading = true
      try {
        await this.$refs.userInfo.validate()
        await saveUserDetailById({
          ...this.userInfo,
          password: this.userInfo.password2
        })
        this.$message.success('更新成功')
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style></style>
