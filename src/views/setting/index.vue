<template>
  <div>
    <el-tabs class="app-container">
      <el-tab-pane label="角色管理" name="first">
        <!-- 新增角色按钮 -->
        <el-row style="height: 60px">
          <el-button
            icon="el-icon-plus"
            size="small"
            type="primary"
            @click="add"
          >新增角色</el-button>
        </el-row>
        <!-- 表格 -->
        <el-table v-loading="loading" border :data="list" width="100%">
          <el-table-column label="序号" width="80" type="index" />
          <el-table-column prop="name" label="角色名称" width="240" />
          <el-table-column prop="description" label="描述" />
          <el-table-column label="操作" width="320">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="success"
                @click="assign(scope.row.id)"
              >分配权限</el-button>
              <el-button
                size="small"
                type="primary"
                @click="edit(scope.row)"
              >编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="del(scope.row.id)"
              >删除</el-button>
            </template>
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
      <el-tab-pane label="公司信息" name="second">
        <el-form label-width="120px" style="margin-top: 50px">
          <el-form-item label="公司名称">
            <el-input v-model="formData.name" disabled style="width: 400px" />
          </el-form-item>
          <el-form-item label="公司地址">
            <el-input
              v-model="formData.companyAddress"
              disabled
              style="width: 400px"
            />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input
              v-model="formData.mailbox"
              disabled
              style="width: 400px"
            />
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="formData.remarks"
              type="textarea"
              :rows="3"
              disabled
              style="width: 400px"
            />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <RoleDialog
      ref="roleDialog"
      :dialog-visible.sync="dialogVisible"
      @refresh="getRoleList"
    />
  </div>
</template>

<script>
import RoleDialog from './components/roleDialog.vue'
import { getRoleList, deleteRole, getCompanyInfo } from '@/api/settings'
import { mapGetters } from 'vuex'
export default {
  name: 'Hrsaas1Index',
  components: {
    RoleDialog
  },

  data() {
    return {
      activeName: 'second',
      page: {
        page: 1,
        pagesize: 10
      },
      list: [],
      total: 0,
      loading: false,
      dialogVisible: false,
      formData: {}
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  mounted() {
    this.getRoleList()
    this.getCompanyInfo()
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
    },
    // 新增角色
    add() {
      this.dialogVisible = true
    },
    edit(row) {
      console.log(row)
      this.dialogVisible = true
      this.$refs.roleDialog.roleForm = { ...row }
    },
    async del(id) {
      console.log(id)
      // this.$alert('这是一段内容', '标题名称', {
      //   confirmButtonText: '确定',
      //   callback: (action) => {
      //     this.$message({
      //       type: 'info',
      //       message: `action: ${action}`
      //     })
      //   }
      // })
      try {
        await this.$confirm('是否确认删除该角色？', '提示', { type: 'warming' })
        await deleteRole(id)
        this.$message.success('角色删除成功')
        this.page.page = 1
        console.log('=========')
        this.getRoleList()
      } catch (error) {
        console.log(error)
      }
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  margin-top: 20px;
}
</style>
