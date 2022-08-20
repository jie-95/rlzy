<template>
  <el-tabs class="app-container">
    <el-tab-pane label="角色管理" name="first">
      <!-- 新增角色按钮 -->
      <el-row style="height: 60px">
        <el-button
          icon="el-icon-plus"
          size="small"
          type="primary"
          @click="dialogVisible = true"
        >新增角色</el-button>
      </el-row>
      <!-- 表格 -->
      <el-table v-loading="loading" border :data="list" width="100%">
        <el-table-column label="序号" width="80" type="index" />
        <el-table-column prop="name" label="角色名称" width="240" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作" width="320">
          <el-button size="small" type="success">分配权限</el-button>
          <el-button size="small" type="primary">编辑</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" justify="end" style="height: 60px" align="middle">
        <el-pagination
          background
          :current-page.sync="page.page"
          layout="total,prev, pager, next, sizes"
          :page-size.sync="page.pagesize"
          :page-sizes="[5, 10, 15, 20]"
          :total="total"
          @current-change="changePage"
          @size-change="changeSize"
        />
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="公司信息" name="second">公司信息</el-tab-pane>
    <RoleDialog :dialog-visible="dialogVisible" />
  </el-tabs>
</template>

<script>
import RoleDialog from './components/roleDialog.vue'
import { getRoleList } from '@/api/settings'
export default {
  name: 'Hrsaas1Index',
  components: {
    RoleDialog
  },

  data() {
    return {
      page: {
        page: 1,
        pagesize: 10
      },
      list: [],
      total: 0,
      loading: false,
      dialogVisible: false
    }
  },

  mounted() {
    this.getRoleList()
  },

  methods: {
    async getRoleList() {
      try {
        this.loading = true
        const { rows, total } = await getRoleList(this.page)
        this.list = rows
        this.total = total
        console.log(this.list)
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    changePage(val) {
      console.log(this.page.page)
      this.getRoleList()
    },
    changeSize() {
      this.getRoleList()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  margin-top: 20px;
}
</style>
