<template>
  <!-- 新增部门的弹层 -->
  <el-dialog
    title="新增部门"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form
      ref="deptForm"
      label-width="120px"
      :model="formData"
      :rules="rules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 80%"
          placeholder="请选择"
          @focus="getEmployeeSimple"
        >
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :lable="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { getDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      console.log(depts)
      console.log(value)
      const isRepeat = depts.some((ele) => ele.code === value)
      console.log(isRepeat)
      isRepeat ? callback(new Error(`部门编码${value}已存在`)) : callback()
    }
    const checkNameRepeat = async(rule, value, callback) => {
      console.log(this.treeNode.id)
      const { depts } = await getDepartments()
      const list = depts.filter((ele) => this.treeNode.id === ele.pid)
      console.log(list)
      const isRepeat = list.some((ele) => ele.name === value)
      isRepeat
        ? callback(new Error(`部门名称在同级部门${value}已存在`))
        : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '部门名称必填', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门名称要求1-50个字符',
            trigger: 'blur'
          },
          { validator: checkNameRepeat, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码必填', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门编码要求1-50个字符',
            trigger: 'blur'
          },
          { validator: checkCodeRepeat, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门管理者必填', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍必填', trigger: 'blur' },
          {
            min: 1,
            max: 300,
            message: '部门介绍要求1-300个字符',
            trigger: 'blur'
          }
        ]
      },
      peoples: []
    }
  },
  methods: {
    handleClose() {
      console.log(123)
      this.$refs.deptForm.resetFields()
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
      this.$emit('update:dialogVisible', false)
    },
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
      console.log(this.peoples)
    }
  }
}
</script>
