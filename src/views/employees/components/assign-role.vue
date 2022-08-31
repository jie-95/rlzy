<template>
  <el-dialog title="分配角色" :visible="value" :before-close="handleClose">
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">
        {{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button
          v-loading="loading"
          type="primary"
          size="small"
          @click="btnOk"
        >确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/settings'
import { getUuserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  name: 'HrsaasAssignRole',
  inheritAttrs: false,
  model: {
    event: 'change'
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleIds: [],
      roleList: [],
      loading: false
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.getUuserDetailById()
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('change', false)
    },
    async getRoleList() {
      const { rows } = await getRoleList()
      this.roleList = rows
      console.log(this.roleList)
      this.getUuserDetailById()
    },
    async getUuserDetailById() {
      const { roleIds } = await getUuserDetailById(this.$attrs['user-id'])
      // console.log(roleIds)
      this.roleIds = roleIds || []
    },
    async btnOk() {
      this.loading = true
      try {
        await assignRoles({ id: this.$attrs['user-id'], roleIds: this.roleIds })
        this.$message.success('更新成功')
        this.handleClose()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
