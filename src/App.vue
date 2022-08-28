<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // 导出exceL文件/
    // import('@/vendor/Export2Excel').then((excel) => {
    //   excel.export_json_to_excel({
    //     header: ['111'], // 表头 必填
    //     data: [[11]], // 具体数据 必填
    //     filename: 'excel-list', // 非必填
    //     autoWidth: true, // 非必填
    //     bookType: 'xlsx' // 非必填
    //   })
    // })
  }
}
</script>
