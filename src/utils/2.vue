<template>
  <div class="upload-file">
    <el-upload
        ref="upload"
        accept=".xlsx"
        multiple
        :limit="5"
        action="http://xxx.xxx.xxx/personality/uploadExcel"
        :on-preview="handlePreview"
        :on-change="handleChange"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :http-request="uploadFile"
        :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
          style="margin-left: 133px"
          size="small"
          type="success"
          @click="submitUpload">
        上传到服务器
      </el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传xlsx文件，且不超过100m
      </div>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},

  // 计算属性
  computed: {},
  watch: {},
  mounted () {},
  data () {
    return {
      fileData: '', // 文件上传数据（多文件合一）
      fileList: [], // upload多文件数组
      uploadData: {
        fieldData: {
          id: '' // 机构id,
        }
      }
    };
  },
  methods: {
    // 上传文件
    uploadFile (file) {
      this.fileData.append('files', file.file); // append增加数据
    },

    // 上传到服务器
    submitUpload () {
      const fieldData = this.uploadData.fieldData; // 缓存，注意，fieldData不要与fileData看混
      if (fieldData.id === '') {
        this.$message({
          message: '请选择上传机构',
          type: 'warning'
        });
      } else if (this.fileList.length === 0) {
        this.$message({
          message: '请先选择文件',
          type: 'warning'
        });
      } else {
        const isLt100M = this.fileList.every(
          (file) => file.size / 1024 / 1024 < 100
        );
        if (!isLt100M) {
          this.$message.error('请检查，上传文件大小不能超过100MB!');
        } else {
          this.fileData = new FormData(); // new formData对象
          this.$refs.upload.submit(); // 提交调用uploadFile函数
          this.fileData.append('pathId', fieldData.id); // 添加机构id
          this.fileData.append('loginToken', this.loginToken); // 添加token
          post(
            this.baseUrlData.url_02 + ':8090/personality/uploadExcel',
            this.fileData
          ).then((response) => {
            if (response.data.code === 0) {
              this.$message({
                message: '上传成功',
                type: 'success'
              });
              this.fileList = [];
            } else {
              this.$message({
                message: response.data.desc,
                type: 'error'
              });
            }
          });
        }
      }
    },

    // 移除
    handleRemove (file, fileList) {
      this.fileList = fileList;
      // return this.$confirm(`确定移除 ${ file.name }？`);
    },

    // 选取文件超过数量提示
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },

    // 监控上传文件列表
    handleChange (file, fileList) {
      const existFile = fileList
        .slice(0, fileList.length - 1)
        .find((f) => f.name === file.name);
      if (existFile) {
        this.$message.error('当前文件已经存在!');
        fileList.pop();
      }
      this.fileList = fileList;
    }
  }
};
</script>
<style lang="scss" scoped></style>
