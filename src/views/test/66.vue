<template>
  <div>
    <el-form
        ref="addJsonForm"
        :model="addJsonForm"
        :rules="addJsonForm.addJsonRules"
        :inline="true"
        label-width="108px">
      <el-table :data="addJsonForm.params" style="width: 100%" border>
        <el-table-column type="selection" width="55" align="center" />

        <el-table-column align="center">
          <template slot="header">
            <span style="color:#2d65dc;">成员名称</span>
            <i style="color:#F56C6C;">*</i>
          </template>
          <template slot-scope="scope">
            <el-form-item
                :prop="'params.' + scope.$index + '.name'"
                :rules="addJsonForm.addJsonRules.name">
              <el-input
                  v-model="scope.row.name"
                  type="text"
                  autocomplete="off" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column align="center">
          // eslint-disable-next-line vue/no-unused-vars
          <template slot="header">
            <span style="color:#2d65dc;">成员值</span>
            <i style="color:#F56C6C;">*</i>
          </template>
          <template slot-scope="scope">
            <el-form-item
                :prop="'params.' + scope.$index + '.value'"
                :rules="addJsonForm.addJsonRules.value">
              <el-input
                  v-model="scope.row.value"
                  type="text"
                  autocomplete="off" />
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      addJsonForm: {
        params: [
          {
            name: '111',
            value: '222'
          },
          {
            name: '111',
            value: '222'
          }
        ],
        addJsonRules: {
          name: [
            { required: true, message: '请输入成员名称', trigger: 'blur' }
          ],
          value: [
            { required: true, message: '成员值不能为空', trigger: 'blur' }
          ]
        }
      }
    };
  }
};
</script>
