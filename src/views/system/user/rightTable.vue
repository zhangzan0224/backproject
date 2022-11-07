<template>
  <div class="rightTable">
    <!-- 搜索区域 -->
    <div class="search">
      <!-- 搜索框 -->
      <el-input
          v-model="searchParams.blurry"
          placeholder="请输入名称或者邮箱"
          class="input" />
      <!-- 日期选择器 -->
      <el-date-picker
          v-model="searchParams.createTime"
          type="datetimerange"
          prefix-icon="el-icon-date"
          editable
          :picker-options="pickerOptions"
          range-separator="至"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          style="margin-right: 10px" />
      <!-- 选择器 -->
      <el-select
          v-model="searchParams.enabled"
          placeholder="状态"
          @change="handlerSelect">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
      </el-select>
      <!-- 按钮 -->
      <el-button type="success" icon="el-icon-search" @click="searchUser">
        搜索
      </el-button>
      <el-button
          type="warning"
          icon="el-icon-refresh"
          @click="resetSearchParams">
        重置
      </el-button>
    </div>
    <!-- 按钮区域 -->
    <div class="buttonArea">
      <el-button
          v-permission="['admin', 'user:add']"
          type="success"
          icon="el-icon-plus"
          @click="addUser">
        新增
      </el-button>
      <el-button
          type="warning"
          icon="el-icon-edit"
          :disabled="selection.length !== 1"
          @click="updateUser(userInfo)">
        修改
      </el-button>
      <el-button
          type="danger"
          icon="el-icon-delete"
          :disabled="selection.length === 0"
          @click="deleteSelection">
        删除
      </el-button>
      <el-button type="primary" icon="el-icon-download" @click="exportData">
        导出
      </el-button>
    </div>
    <!-- 表格区域 -->
    <div class="tableArea">
      <el-table
          ref="multipleTable"
          :data="usersList"
          style="width: 100%"
          border
          size="medium"
          select-on-indeterminate
          @select-all="selectAll"
          @select="select">
        <el-table-column type="selection" width="55" />
        <el-table-column
            prop="username"
            label="用户名"
            min-width="60px"
            class="hid"
            :show-overflow-tooltip="true" />
        <el-table-column
            prop="nickName"
            label="昵称"
            width="80px"
            :show-overflow-tooltip="true" />
        <el-table-column prop="gender" label="性别" width="50" />
        <el-table-column prop="phone" label="电话" width="120" />
        <el-table-column
            prop="email"
            label="邮箱"
            :show-overflow-tooltip="true" />
        <el-table-column label="部门" width="90px" prop="dept.name" />
        <el-table-column label="状态" width="70px" align="center">
          <template slot-scope="{ row }">
            <el-switch
                v-model="row.enabled"
                active-color="#409EFF"
                inactive-color="#ff4949"
                @change="handleSwitchChange(row)" />
          </template>
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="创建日期"
            :show-overflow-tooltip="true" />
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="updateUser(row)" />
            <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="deletUser(row)" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器       :page-size="searchParams.size"         -->
      <el-pagination
          :current-page="searchParams.page + 1"
          :page-sizes="[10, 20, 30, 40, 100, 200]"
          :page-size="searchParams.size"
          layout="total,  prev, pager, next,sizes"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
    </div>
    <AddOrUpdateUser
        ref="addOrUpdateFormRef"
        @updateuserlist="resetSearchParams" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import AddOrUpdateUser from './addOrUpdateUser.vue';
import dayjs from 'dayjs';
// 导入深拷贝
import cloneDeep from 'lodash/cloneDeep';
// 初始的搜索参数
const searchParams = {
  blurry: '', // 模糊的
  createTime: undefined,
  deptId: undefined,
  deptIds: [],
  enabled: undefined,
  id: undefined,
  page: 0,
  size: 10,
  sort: ['id,desc']
};
export default {
  name: 'RightTable',
  components: { AddOrUpdateUser },
  data () {
    return {
      // 日期pick
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      dataPickerVal: '',
      // 下拉选择,激活与未激活
      options: [
        {
          value: true,
          label: '激活'
        },
        {
          value: false,
          label: '锁定'
        }
      ],
      // 搜索参数
      searchParams: Object.assign({}, searchParams),
      // 用户列表
      usersList: [],
      // 用户列表总数
      total: 1,
      // 选择的用户
      selection: [],
      // 选择的用户信息
      userInfo: {}
    };
  },
  // 计算属性
  computed: {
    ...mapState({
      deptId: (state) => state.user.deptId,
      deptIds: (state) => state.user.deptIds
    })
  },
  watch: {
    deptId (newVal) {
      this.searchParams.deptId = newVal;
      this.getUsersList();
    },
    deptIds (newVal) {
      this.searchParams.deptIds = newVal;
      this.getUsersList();
    }
  },
  mounted () {
    // 获取用户列表
    console.log(this);
    this.getUsersList();
  },
  methods: {
    // 获取用户列表数据
    getUsersList () {
      // console.log(this.searchParams)
      this.$api.users.reqGetUsersList(this.searchParams).then((res) => {
        this.usersList = res.content;
        this.total = res.totalElements;
      });
    },
    updateUser (user) {
      this.$refs.addOrUpdateFormRef.initSelectTree();
      const obj = cloneDeep(user);
      obj.jobs = obj.jobs.map((item) => item.id);
      obj.roles = obj.roles.map((item) => item.id);
      delete obj.dept.name;
      // 表格初始化数据
      this.$refs.addOrUpdateFormRef.addOrUpdate(true, obj);
      // 当到了表格之后,将数组置为空
      this.selection = [];
    },
    // 点击搜索时候的事件
    searchUser () {
      // ! 需要将页码改为初始状态
      this.searchParams.page = 0;
      this.getUsersList();
    },
    // 页码变化
    handleSizeChange (size) {
      this.searchParams.size = size;
      this.getUsersList();
    },
    // 页面size发生变化
    handleCurrentChange (page) {
      this.searchParams.page = page - 1;
      this.getUsersList();
    },
    //  选择器修改的时候,回调函数
    handlerSelect (enabled) {
      this.searchParams.enabled = enabled;
    },
    // 重置参数
    resetSearchParams () {
      // 将默认参数定义成常量
      // !合并参数,为什么前面是一个空对象呢,这样这个对象上门都会存在getter和 setter
      this.searchParams = Object.assign({}, searchParams);
      this.getUsersList();
    },
    // switch 开关进行修改
    handleSwitchChange (user) {
      // console.log(user)
      this.$confirm(`此操作将更新${user.username}的状态`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            await this.$api.users.reqUpdateUser(user);
            // 重新获取数据
            this.getUsersList();
            this.$message({
              type: 'success',
              message: '更新成功!'
            });
          } catch (error) {
            this.$message({
              type: 'info',
              message: error.message
            });
          }
        })
        .catch(() => {
          // 更新失败
          // 也需要重新发请求 ??
          user.enabled = !user.enabled;
          this.$message({
            type: 'warning',
            message: '更新失败'
          });
        });
    },

    // 删除用户
    deletUser (row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            // 发请求删除用户
            await this.$api.users.reqDeleteUser([row.id]);
            // 重新获取数据,需要判断删除之后的
            if (this.usersList.length < 1) {
              this.searchParams.page = this.searchParams.page - 1;
            }
            // 重新获取用户列表数据
            this.getUsersList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } catch (error) {
            console.log(error);
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },

    // 点击增加按钮 需解决数据回显
    addUser () {
      this.$refs.addOrUpdateFormRef.addOrUpdate();
    },
    selectAll (selection) {
      // 获取到所有的选择的
      // console.log(selection);
      this.selection = selection.map((item) => item.id);
    },
    // 多选删除
    deleteSelection () {
      this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            // 发请求删除用户
            await this.$api.users.reqDeleteUser(this.selection);
            // 重新获取数据,需要判断删除之后的
            if (this.usersList.length < 1) {
              this.searchParams.page = this.searchParams.page - 1;
            }
            this.getUsersList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } catch (error) {
            console.log(error);
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 单选的事件
    select (selection, row) {
      // console.log(selection);
      // console.log(row);
      this.selection = selection.map((item) => item.id);
      this.userInfo = row;
    },
    // 导出数据
    async exportData () {
      const res = await this.$api.users.reqDownload(this.searchParams);
      // console.log(res);
      const blob = new Blob([res], { type: 'application/vnd.ms-excel' }); // 处理文档流
      const elink = document.createElement('a');
      const newDate = dayjs().format('YYYY_MM_DD-HH_mm_ss');
      const title = this.$route.meta.title;
      elink.download = newDate + '-' + title + '.xlsx';
      elink.style.display = 'none';
      elink.href = URL.createObjectURL(blob); // 设置链接
      document.body.appendChild(elink); // 添加到dom中
      elink.click(); // 模拟点击事件
      URL.revokeObjectURL(elink.href); // 释放URL 对象
      document.body.removeChild(elink);
    }
  }
};
</script>
<style lang="scss" scoped>
.rightTable {
  width: calc(100% - 200px);
  height: 100%;
  // border: 1px solid #ccc;
  float: left;
  padding: 10px;
}
.el-input {
  width: 180px;
  margin-right: 10px;
}
.el-date-picker {
  width: 400px;
}
.el-select {
  width: 100px;
  margin-right: 10px;
}
.buttonArea {
  margin: 10px 0 10px 0;
}
.tableArea {
  height: calc(100vh - 100px);
}
.el-pagination {
  margin-top: 10px;
}
</style>
