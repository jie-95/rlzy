<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="width: 100%"
  >
    <!-- 左侧内容 -->
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <!-- 右侧内容 -->
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 负责人 -->
        <el-col>{{ treeNode.manager }}</el-col>
        <!-- 操作 -->
        <el-col>
          <!-- 放置下拉菜单 -->
          <el-dropdown @command="handleCommand">
            <!-- 内容 -->
            <span>操作
              <i class="el-icon-arrow-down" />
            </span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item
                v-if="isRoot"
                command="edit"
              >编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    //   定义一个props属性
    treeNode: {
      type: Object, // 对象类型
      required: true // 要求对方使用您的组件的时候 必须传treeNode属性 如果不传 就会报错
    },
    isRoot: {
      // isRoot 来控制 编辑部门 和 删除部门 的 显示 隐藏
      type: Boolean,
      default: true // 默认显示
    }
  },
  methods: {
    handleCommand(type) {
      if (type === 'add') {
        // 新增
        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        // 编辑
        this.$emit('editDepts', this.treeNode)
      } else {
        // 删除
        this.$confirm('确认删除该部门吗？', '提示', { type: 'warming' }).then(
          async(res) => {
            await delDepartments(this.treeNode.id)
            this.$emit('refreshDept')
            this.$message.success('删除成功')
          }
        )
      }
    }
  }
}
</script>

<style></style>
