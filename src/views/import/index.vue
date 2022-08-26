<template>
  <div>
    <UploadExcel :on-success="success" />
  </div>
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  computed: {
    type() {
      return this.$route.query.type
    }
  },
  methods: {
    async success({ results }) {
      if (this.type === 'user') {
        //   console.log(results)
        const userRelations = {
          入职日期: 'timeOfEntry',
          手机号: 'mobile',
          姓名: 'username',
          转正日期: 'correctionTime',
          工号: 'workNumber'
        }
        const arr = results.map((ele) => {
          const user = {}
          Object.keys(ele).forEach((key) => {
            // ==========时间处理==========
            if (
              userRelations[key] === 'timeOfEntry' ||
              userRelations[key] === 'correctionTime'
            ) {
              user[userRelations[key]] = new Date(
                this.formatDate(ele[key], '/')
              ) // 只有这样, 才能入库
              return
            }
            // =========时间处理===============

            user[userRelations[key]] = ele[key]
          })
          return user
        })
        console.log(arr)
        await importEmployee(arr)
        this.$message.success('批量导入成功')
      }

      this.$router.back()
    },
    formatDate(numb, format) {
      const time = new Date(numb * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return (
        year +
        (month < 10 ? '0' + month : month) +
        (date < 10 ? '0' + date : date)
      )
    }
  }
}
</script>

<style></style>
