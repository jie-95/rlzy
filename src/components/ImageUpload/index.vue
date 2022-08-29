<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.3)"
      list-type="picture-card"
      :file-list="fileList"
      action="#"
      :http-request="onRequest"
      :on-change="change"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="1"
      :class="fileList.length === 1 ? 'hideAdd' : ''"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>

    <el-dialog title="图片预览" :visible.sync="previewImgDialogVisible">
      <img style="width: 100%" :src="previewImgUrl">
    </el-dialog>
  </div>
</template>
<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDHOFp8AvPcYCahX7QRCfsnRoujHYXFbgU',
  SecretKey: 'ZqqZ1C6i37uQfeMnysVrwjGVTAajbBUX'
})
// console.log(cos)
export default {
  name: 'UploadImg',
  props: {
    limit: {
      type: Number,
      default: 1
    }

    // beforeUploadCheck: Function
  },
  data() {
    return {
      // fileList: [
      //   { name: 'default', url: 'http://destiny001.gitee.io/image/cxk.gif' }
      // ],
      fileList: [], // 图片地址设置为数组
      previewImgDialogVisible: false, // 控制显示弹层
      previewImgUrl: '', // 图片地址
      loading: false
    }
  },
  methods: {
    change(file, fileList) {
      this.fileList = fileList
    },
    onRequest(data) {
      console.log('====', data.file)
      this.loading = true

      cos.putObject(
        {
          Bucket: 'young-1313544783' /* 填入您自己的存储桶，必须字段 */,
          Region: 'ap-guangzhou' /* 存储桶所在地域，例如ap-beijing，必须字段 */,
          Key: data.file
            .name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
          StorageClass: 'STANDARD',
          Body: data.file, // 上传文件对象
          onProgress: function(progressData) {
            // console.log(JSON.stringify(progressData))
            // 这个就是上传的百分比
            // params.percent 表示当前上传的进度
          }
        },
        (err, data) => {
          console.log('====', err, data)
          this.loading = false
          if (err || data.statusCode !== 200) {
            return this.$message('图片上传失败，请重新上传')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location
          })
        }
      )
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      this.previewImgDialogVisible = true
      this.previewImgUrl = file.url
    },
    beforeUpload(file) {
      // if (this.beforeUploadCheck && !this.beforeUploadCheck(file)) {
      //   return false
      // }
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error(`请选择一下${types.join(',')}格式`)
        return false
      }
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('文件最大为5Mb')
        return false
      }
      return true
    }
  }
  // mounted: {
  //   this.beforeUploadCheck()
  // }
}
</script>
<style lang="scss">
.hideAdd .el-upload--picture-card {
  display: none;
}
</style>
