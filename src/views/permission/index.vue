<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools :show-befor="false">
        <template v-slot:after>
          <el-button
            type="primary"
            size="small"
            @click="addPer('0', 1)"
          >添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table
        border
        :data="perList"
        row-key="id"
        :default-expand-all="true"
        :loading="loading"
      >
        <el-table-column label="序号" type="index" />
        <el-table-column align="center" label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="left" label="操作">
          <template slot-scope="{ row }">
            <el-button
              v-if="row.type * 1 == 1"
              type="text"
              icon="el-icon-circle-plus-outline"
              @click="addPer(row.id, 1)"
            >添加</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="edit(row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              style="color: #f56c6c"
              @click="del(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <add-permission ref="addPermission" :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import { getPermissionList, delPermission } from '@/api/permission'
import { tranListToTreeData } from '@/utils/index'
import addPermission from './addPermission.vue'
export default {
  name: 'Hrsaas1Index',
  components: { addPermission },

  data() {
    return {
      showBefor: true,
      perList: [],
      loading: false,
      dialogVisible: false
    }
  },

  mounted() {
    this.getPermissionList()
  },

  methods: {
    async getPermissionList() {
      this.loading = true
      try {
        const res = await getPermissionList()
        this.perList = tranListToTreeData(res, '0')

        console.log(this.perList)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async del(id) {
      try {
        await this.$confirm('确认删除吗？', '提示', { type: 'warming' })
        await delPermission(id)
        this.$message.success('删除成功')
        this.getPermissionList()
      } catch (error) {
        console.log(error)
      }
    },
    addPer(pid, type) {
      console.log(pid, type)
      this.$refs.addPermission.formData.pid = pid
      this.$refs.addPermission.formData.type = type
      this.dialogVisible = true
    },
    edit(row) {
      this.$refs.addPermission.formData = row
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped></style>
