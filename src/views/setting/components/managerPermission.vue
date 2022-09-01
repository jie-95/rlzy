<template>
  <el-dialog
    title="分配权限"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-tree
      ref="permTree"
      :data="permData"
      show-checkbox
      :props="defaultProps"
      :default-checked-keys="['62f0d56637ecc10a881557f5']"
      :default-expand-all="true"
      :check-strictly="true"
      node-key="id"
    />
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getPermissionList } from '@/api/permisson'
import { tranListToTreeData } from '@/utils'
import { getRoleDetail, assignPerm } from '@/api/setting'
export default {
  name: 'HrsaasManagerPermission',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      permData: [],
      defaultProps: {
        label: 'name'
      },
      selectCheck: [],
      loading: false
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    async getPermissionList() {
      try {
        const res = await getPermissionList()
        this.permData = tranListToTreeData(res, '0')
        const { permIds } = await getRoleDetail(this.$attrs['role-id'])
        this.selectCheck = permIds
        console.log('this.selectCheck', this.selectCheck)
      } catch (e) {
        console.log(e)
      }
    },
    async btnOk() {
      try {
        this.loading = true
        await assignPerm({
          permIds: this.$refs.permTree.getCheckedKeys(),
          id: this.$attrs['role-id']
        })
        this.$message.success('角色分配成功')
        this.handleClose()
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
