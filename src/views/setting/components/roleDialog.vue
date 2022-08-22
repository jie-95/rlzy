<template>
  <el-dialog
    :title="`${roleForm.id ? '修改' : '新增'}角色`"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-form ref="roleDialogForm" label-width="80px" :model="roleForm">
      <el-form-item
        prop="name"
        label="角色"
        :rules="[{ required: true, message: '角色必填', trigger: 'blur' }]"
      >
        <el-input v-model="roleForm.name" placeholder="请输入角色" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          v-model="roleForm.description"
          type="textarea"
          row="3"
          placeholder="请输入描述"
        />
      </el-form-item>
    </el-form>
    <el-row
      slot="footer"
      type="flex"
      justify="center"
      align="middle"
      class="dialog-footer"
    >
      <el-button @click="handleClose">取 消</el-button>
      <el-button
        type="primary"
        :loading="loading"
        @click="submitRole"
      >确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { addRole, updateRole } from '@/api/settings'
export default {
  name: 'Hrsaas1RoleDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      // dialogVisible: true
      roleForm: {
        name: '',
        description: ''
      },
      loading: false
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.roleDialogForm.resetFields()

      // 清除修改角色是传进来的id
      this.roleForm = {
        name: '',
        description: ''
      }
      // 清除修改角色是传进来的id
    },
    async submitRole() {
      try {
        // 表单验证
        await this.$refs.roleDialogForm.validate()
        this.loading = true
        this.roleForm.id
          ? await updateRole(this.roleForm)
          : await addRole(this.roleForm)
        // 调用父组件，更新列表
        // this.$parent.getRoleList()
        this.$emit('refresh')
        // 提示更新成功
        this.$message.success(`角色${this.roleForm.id ? '修改' : '新增'}成功`)
        // 关闭弹窗
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
