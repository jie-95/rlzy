<template>
  <div class="app-container">
    <PageTools type="success">
      <!-- 具名插槽
      旧语法：slot="插槽名"
      新语法：v-slot:插槽名
       -->
      <!-- <template v-slot:before>共166条记录</template> -->
      <span slot="before">共{{ total }}条记录</span>
      <template slot="after">
        <el-button size="small" type="warning">导入</el-button>
        <el-button size="small" type="danger">导出</el-button>
        <el-button
          size="small"
          type="primary"
          @click="addEmplyee"
        >新增员工</el-button>
      </template>
    </PageTools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table v-loading="loading" border :data="list">
        <el-table-column label="序号" type="index" sortable="" width="80" />
        <!-- <el-table-column property="name" label="姓名" width="120" /> -->
        <el-table-column prop="username" label="姓名" />
        <el-table-column prop="workNumber" label="工号" />
        <el-table-column
          prop="formOfEmployment"
          :formatter="formatterFn"
          label="聘用形式"
        />
        <el-table-column prop="departmentName" label="部门" />
        <el-table-column prop="timeOfEntry" label="入职时间" sortable="">
          <template slot-scope="scope">
            {{ scope.row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="enbleState" label="账户状态">
          <template slot-scope="{ row }">
            <el-switch :value="row.enbleState === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="{ row }">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button
              type="text"
              size="small"
              @click="del(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          v-if="total > 0"
          background
          layout="total, prev, pager, next, sizes"
          :current-page.sync="page.page"
          :page-size.sync="page.size"
          :page-sizes="[5, 10, 15, 20]"
          :total="total"
          @current-change="getEmployeeList"
          @size-change="getEmployeeList"
        />
      </el-row>
    </el-card>
    <addEmployee
      :visibel-dialog.sync="visibelDialog"
      @refresh="getEmployeeList"
    />
    <!-- .sync 会解析成  :visibelDialog="visibelDialog" 和 update:visibelDialog -->
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import addEmployee from './components/add-emplyee.vue'
export default {
  name: 'Hrsaas1Index',
  components: {
    addEmployee
  },

  data() {
    return {
      loading: false,
      // EmployeeEnum,
      list: [],
      page: {
        page: 1,
        size: 10
      },
      total: 0,
      visibelDialog: false
    }
  },

  mounted() {
    this.getEmployeeList()
  },

  methods: {
    async getEmployeeList() {
      this.loading = true
      try {
        const { rows, total } = await getEmployeeList(this.page)
        this.total = total
        this.list = rows
        if (total !== 0 && rows.length === 0) {
          this.page.page = this.page.page - 1
          this.getEmployeeList()
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    formatterFn(row, column, cellValue, index) {
      // formatterFn(当前行的所有值,当前列属性 , 当前格子值, index)
      // 聘用形式
      // hireType: [
      //   {
      //     id: 1,
      //     value: '正式'
      //   },
      //   {
      //     id: 2,
      //     value: '非正式'
      //   }
      // ],
      const obj = EmployeeEnum.hireType.find((ele) => ele.id === cellValue * 1)
      // return obj ? obj.value : '非正式'
      // ?. obj?.value obj存在吗？ 存在返回obj.value
      // ?? obj?.value obj.value ==> undefind或null 返回 ？？后面的值
      return obj?.value ?? '非正式'
    },
    // 添加员工
    addEmplyee() {
      this.visibelDialog = true
    },
    // 删除员工
    async del(id) {
      await this.$confirm('确认删除此员工吗？', '提示', { type: 'warming' })
      try {
        await delEmployee(id)
        this.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
