<template>
  <el-dialog
      :title="title"
      :visible.sync="addOrUpdatedialogFormVisible"
      @open="onOpen"
      @close="onClose">
    <el-row :gutter="15">
      <el-form
          ref="elForm"
          :model="addOrUpdateFormData"
          :validate-on-rule-change="true"
          :rules="rules"
          size="medium"
          label-width="100px">
        <el-col :span="12">
          <el-form-item label="用户名" prop="username">
            <el-input
                v-model="addOrUpdateFormData.username"
                placeholder="请输入用户名"
                clearable
                :style="{ width: '100%' }" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话" prop="phone">
            <el-input
                v-model="addOrUpdateFormData.phone"
                placeholder="请输入电话"
                clearable
                :style="{ width: '100%' }" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="昵称" prop="nickName">
            <el-input
                v-model="addOrUpdateFormData.nickName"
                placeholder="请输入昵称"
                clearable
                :style="{ width: '100%' }" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input
                v-model="addOrUpdateFormData.email"
                placeholder="请输入邮箱"
                clearable
                :style="{ width: '100%' }" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门" prop="dept.id">
            <treeselect
                v-model="addOrUpdateFormData.dept.id"
                style="height: 32px"
                :options="options"
                :load-options="loadOptions"
                placeholder="请选择你的部门" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="岗位" prop="jobs">
            <el-select
                v-model="addOrUpdateFormData.jobs"
                placeholder="请选择岗位"
                clearable
                :style="{ width: '100%' }"
                multiple>
              <el-option
                  v-for="item in jobsOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="addOrUpdateFormData.gender" size="medium">
              <el-radio
                  v-for="(item, index) in genderOptions"
                  :key="index"
                  :label="item.value"
                  :disabled="item.disabled">
                {{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="enabled">
            <el-radio-group v-model="addOrUpdateFormData.enabled" size="medium">
              <el-radio
                  v-for="(item, index) in enabledOptions"
                  :key="index"
                  :label="item.label">
                {{ item.value }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="角色" prop="roles">
            <el-select
                v-model="addOrUpdateFormData.roles"
                placeholder="请选择角色"
                clearable
                :style="{ width: '100%' }"
                multiple>
              <el-option
                  v-for="item in rolesOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="handelConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
// import the component
import Treeselect, { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect';
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
// 导入深拷贝
import cloneDeep from 'lodash/cloneDeep';
// 延迟函数
const simulateAsyncOperation = (fn) => {
  setTimeout(fn, 200);
};
const addOrUpdateFormData = {
  username: null,
  phone: null,
  nickName: null,
  email: null,
  dept: { id: null },
  jobs: [],
  gender: '男',
  enabled: true,
  roles: []
};
export default {
  name: 'AddOrUpdateUser',
  components: { Treeselect },
  props: [],
  data () {
    const mailReg =
      /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    const checkEmail = (rule, value, callback) => {
      if (!mailReg.test(value)) {
        callback(new Error('请输入正确的邮箱'));
      } else {
        callback();
      }
    };
    const regPhone =
      /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
    const checkPhone = (rule, value, callback) => {
      if (!regPhone.test(value)) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };
    return {
      addOrUpdatedialogFormVisible: false,
      addOrUpdateFormData: Object.assign({}, addOrUpdateFormData),
      // treeselect插件绑定的数据
      options: [], // 下拉树选项
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入电话',
            trigger: 'blur'
          },
          {
            validator: checkPhone,
            trigger: 'blur'
          }
        ],
        nickName: [
          {
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' },
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        dept: [],
        jobs: [],
        gender: [],
        enabled: [],
        roles: []
      },
      // 岗位下拉选项
      jobsOptions: [],
      // 性别下拉选项
      genderOptions: [
        {
          label: '男',
          value: '男'
        },
        {
          label: '女',
          value: '女'
        }
      ],
      enabledOptions: [
        {
          label: true,
          value: '激活'
        },
        {
          label: false,
          value: '锁定'
        }
      ],
      // 角色下拉选项
      rolesOptions: [],
      // 标题:
      title: '添加用户'
    };
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 对话框打开的时候
    onOpen () {
      // 初始化部门数据
      this.initSelectTree();
      // 获取全局角色
      this.getAllRoles();
      // 获取岗位列表
      this.getJobsList();
    },
    // 对话框关闭的时候
    onClose () {
      this.close();
    },
    // 点击取消按钮
    close () {
      this.addOrUpdatedialogFormVisible = false;
      // 初始化数据;
      this.addOrUpdateFormData = cloneDeep(addOrUpdateFormData);
      // 更新数据
      this.$emit('updateuserlist');
    },
    // 点击确认的事件
    handelConfirm () {
      this.$refs.elForm.validate(async (valid) => {
        if (!valid) return;
        const params = cloneDeep(this.addOrUpdateFormData);
        params.jobs = params.jobs.map((id) => ({ id }));
        params.roles = params.roles.map((id) => ({ id }));
        if (params.id) {
          // 存在id就去更新用户
          // delete params.dept.name
          await this.$api.users.reqUpdateUser(params);
        } else {
          await this.$api.users.reqAddUser(params);
        }
        this.close();
      });
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
    },
    // 获取全部角色
    async getAllRoles () {
      const result = await this.$api.role.reqAllRoles();
      // console.log(result)
      this.rolesOptions = result;
    },
    // 获取岗位列表
    async getJobsList () {
      try {
        const result = await this.$api.jobs.reqGetJobs();
        this.jobsOptions = result.content.filter((item) => item.enabled);
      } catch (error) {
        return error;
      }
    },
    // 修改或者新增用户,表格的初始事件,通过父组件来启动
    addOrUpdate (isEidt = false, obj = {}) {
      // 判断是新增还是修改
      if (isEidt) {
        // 获取上级的和同级数据
        this.getSuperior([obj.dept.id]);
        this.addOrUpdateFormData = obj;
        this.title = '修改用户';
      } else {
        this.title = '添加用户';
        // 初始化数据
        this.addOrUpdateFormData = cloneDeep(addOrUpdateFormData);
      }
      this.addOrUpdatedialogFormVisible = true;
    },
    // 根据ID获取同级与上级数据获取同级和上级的数据
    getSuperior (ids) {
      this.$api.department.reqGetSuperior(ids).then((res) => {
        const { content } = res;
        // console.log(content);
        // !需要对上层数据进行加载,另外需要将其他的部门也需要加上小三角,这时需判断,是否已经对children 赋值;
        content.forEach((item) => {
          item.hasChildren && !item.children && (item.children = null);
        });
        this.options = content;
      });
    }
  }
};
</script>
<style></style>
