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
        <el-button
          size="small"
          type="warning"
          @click="$router.push('/import?type=user')"
        >导入</el-button>
        <el-button
          size="small"
          type="danger"
          @click="exportData"
        >导出</el-button>
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
        <el-table-column label="头像">
          <template slot-scope="{ row }">
            <img
              slot="reference"
              v-imgerror="require('@/assets/common/bigUserHeader.png')"
              :src="row.staffPhoto"
              style="
                border-radius: 50%;
                width: 100px;
                height: 100px;
                padding: 10px;
              "
              alt=""
              @click="showQrCode(row.staffPhoto)"
            >
          </template>
          <!-- <img :src="row.staffPhoto"> -->
        </el-table-column>

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
            <el-button
              type="text"
              size="small"
              @click="$router.push(`employees/detail/${row.id}`)"
            >查看</el-button>
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
    <!-- 打印二维码 -->
    <el-dialog title="二维码" :visible.sync="showCodeDialog">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import QrCode from 'qrcode'
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import addEmployee from './components/add-emplyee.vue'
import { formatDate } from '@/filters'
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
      visibelDialog: false,
      showCodeDialog: false
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
    },
    // 导出exceL
    async exportData() {
      const { rows } = await getEmployeeList({
        page: 1,
        size: this.total
      })
      // console.log(rows)
      const headers = {
        姓名: 'username',
        手机号: 'mobile',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName'
      }
      // console.log(this.fromJson(headers, rows))
      // 导出exceL文件/
      import('@/vendor/Export2Excel').then((excel) => {
        excel.export_json_to_excel({
          header: Object.keys(headers), // 表头 必填
          data: this.fromJson(headers, rows), // 具体数据 必填
          filename: 'excel-list', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx', // 非必填
          multiHeader: [['姓名', '主要信息', '', '', '', '', '']],
          merges: ['A1:A2', 'B1:G1']
        })
      })
      //
      //
      //
      // 1.
      // rows.map((ele) => {
      //   const arr = []
      //   Object.keys(headers).forEach((key) => {
      //     arr.push(ele[headers[key]])
      //   })
      //   console.log(arr)
      // })
      //
      //
      // 2.
      // const arr = rows.map((ele) => {
      //   return Object.keys(headers).map((key) => {
      //     return ele[headers[key]]
      //   })
      // })
      // console.log(arr)
      //
      //
      // 3.
      // const arr = rows.map((ele) => {
      //   console.log(ele)
      //   return Object.values(headers).map((key) => {
      //     return ele[key]
      //   })
      // })
      // console.log(arr)
    },
    // 4.
    fromJson(headers, rows) {
      return rows.map((ele) => {
        return Object.values(headers).map((key) => {
          if (key === 'timeOfEntry' || key === 'correctionTime') {
            return formatDate(ele[key])
          } else if (key === 'formOfEmployment') {
            const obj = EmployeeEnum.hireType.find((element) => {
              element.id === +ele[key]
            })
            return obj?.value || '非正式'
          }
          return ele[key]
        })
      })
    },
    showQrCode(url) {
      // url存在的情况下 才弹出层
      if (!url) {
        return this.$message.warning('该用户还未上传头像')
      }
      // console.log(url)
      this.showCodeDialog = true // 数据更新了 但是我的弹层会立刻出现吗 ？页面的渲染是异步的！！！！
      // 有一个方法可以在上一次数据更新完毕，页面渲染完毕之后
      this.$nextTick(() => {
        // 此时可以确认已经有ref对象了
        QrCode.toCanvas(this.$refs.myCanvas, url) // 将地址转化成二维码
        // 如果转化的二维码后面信息 是一个地址的话 就会跳转到该地址 如果不是地址就会显示内容
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
