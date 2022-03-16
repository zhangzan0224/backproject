<template>
  <!-- 新增用户和修改用户对话框 -->
  <el-dialog
      :title="addOrUpdateFormData.username ? '修改用户' : '新增用户'"
      :visible.sync="addOrUpdatedialogFormVisible">
    <el-form
        ref="addOrUpdateFormRef"
        :inline="true"
        :model="addOrUpdateFormData"
        label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addOrUpdateFormData.username" />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="addOrUpdateFormData.phone" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="addOrUpdateFormData.nickName" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addOrUpdateFormData.email" />
      </el-form-item>
      <el-form-item label="部门" prop="dept.id">
        <!-- 部门 treeselect      :multiple="true" -->
        <treeselect
            v-model="addOrUpdateFormData.dept.id"
            style="width: 168px; height: 32px"
            :options="options"
            :load-options="loadOptions"
            placeholder="请选择你的部门" />
      </el-form-item>
      <el-form-item label="岗位" prop="jobs">
        <el-select
            v-model="addOrUpdateFormData.jobs"
            placeholder="选择岗位"
            style="width: 180px"
            multiple>
          <el-option
              v-for="job in jobsList"
              :key="job.id"
              :label="job.name"
              :value="job.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group
            v-model="addOrUpdateFormData.gender"
            style="width: 180px">
          <el-radio label="男" value="男">男</el-radio>
          <el-radio label="女" vlaue="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="enabled">
        <el-radio-group
            v-model="addOrUpdateFormData.enabled"
            style="width: 180px">
          <el-radio :label="true" :value="true">激活</el-radio>
          <el-radio :label="false" :value="false">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色" prop="roles">
        <el-select
            v-model="addOrUpdateFormData.roles"
            style="width: 250%"
            placeholder="请选择"
            multiple
            value-key="id">
          <el-option
              v-for="role in allRolesList"
              :key="role.id"
              :label="role.name"
              :value="role.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
          style="border: none; outline: none"
          @click="addOrUpdatedialogFormVisible = false">
        取 消
      </el-button>
      <el-button type="primary" @click="addUser">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
// import the component
import Treeselect, { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect';
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
// 延迟函数
const simulateAsyncOperation = (fn) => {
  setTimeout(fn, 200);
};

export default {
  name: 'AddOrUpdateUser',
  components: { Treeselect },
  data () {
    return {
      // 全局角色数组options
      allRolesList: [],
      // 全局岗位列表options
      jobsList: [],
      addOrUpdatedialogFormVisible: false, // 对话框的状态
      // 添加或者修改的表单数据
      addOrUpdateFormData: {
        dept: { id: null },
        email: '',
        enabled: true,
        gender: '男',
        jobs: [],
        nickName: '',
        phone: '',
        roles: [],
        username: ''
      },
      // treeselect插件绑定的数据
      options: [] // 下拉树选项
    };
  },
  // 计算属性
  computed: {},
  watch: {},
  mounted () {
    this.initSelectTree();
    // 获取全局角色
    this.getAllRoles();
    // 获取岗位列表
    this.getJobsList();
  },
  methods: {
    addUser () {
      this.$refs.addOrUpdateFormRef.validate(async (valid) => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.addOrUpdateFormData));
          params.jobs = params.jobs.map((id) => ({ id }));
          params.roles = params.roles.map((id) => ({ id }));
          // console.log(params)
          this.$api.users.reqAddUser(params);
          // 添加成功之后,关闭对话框
          this.addOrUpdatedialogFormVisible = false;
          // 更新数据
          this.$emit('updateUserList');
        }
      });
    },
    init () {
      this.addOrUpdatedialogFormVisible = true;
    },
    // 获取全部角色
    async getAllRoles () {
      const result = await this.$api.role.reqAllRoles();
      // console.log(result)
      this.allRolesList = result;
    },
    // 获取岗位列表
    async getJobsList () {
      try {
        const result = await this.$api.jobs.reqGetJobs();
        this.jobsList = result.content.filter((item) => item.enabled);
      } catch (error) {
        return error;
      }
    },
    // 获取首次的selecttree
    async initSelectTree (pid = null, isChildren = false, parentNode, callback) {
      const { content } = await this.$api.department.reqGetDept({ pid });
      content.forEach((item) => {
        item.hasChildren && (item.children = null);
      });
      if (!isChildren) {
        this.options = content;
        return;
      }
      parentNode.children = content;
      simulateAsyncOperation(callback);
    },
    loadOptions ({ action, parentNode, callback }) {
      if (action === LOAD_CHILDREN_OPTIONS) {
        this.initSelectTree(parentNode.id, true, parentNode, callback);
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
