<template>
  <el-dialog
    title="分配权限"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <!--
show-checkbox        节点是否可被选择 checkbox 出现
default-expand-all   默认展开
props                配置选项
default-checked-keys 默认选中的节点
check-strictly       父子不联动

如果需要通过 key 来获取或设置，则必须设置node-key。

准备好假数据
permData: [
  {
    code: 'employees',
    description: '用户管理菜单',
    enVisible: '1',
    id: '604f7df5f900be1850edb152',
    name: '员工管理',
    pid: '0',
    type: 1,
    children: [
        {
        code: '214234',
        description: '412214',
        enVisible: '0',
        id: '62f0d56637ecc10a881557f5',
        name: '智商250',
        pid: '604f7df5f900be1850edb152',
        type: 2
        }
    ]
  }
],
defaultProps: {
 label: 'name'
},
-->
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
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
// import assign from '@/api/settings'
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
      permData: [
        {
          code: 'employees',
          description: '用户管理菜单',
          enVisible: '1',
          id: '604f7df5f900be1850edb152',
          name: '员工管理',
          pid: '0',
          type: 1,
          children: [
            {
              code: '214234',
              description: '412214',
              enVisible: '0',
              id: '62f0d56637ecc10a881557f5',
              name: '智商250',
              pid: '604f7df5f900be1850edb152',
              type: 2
            }
          ]
        }
      ],
      defaultProps: {
        label: 'name'
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>
