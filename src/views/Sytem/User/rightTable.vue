<template>
  <div class="rightTable">
    <!-- 搜索区域 -->
    <div class="search">
      <!-- 搜索框 -->
      <el-input
        v-model="searchParams.blurry"
        placeholder="请输入名称或者邮箱"
        class="input"
      >
      </el-input>
      <!-- 日期选择器 -->
      <el-date-picker
        v-model="dataPickerVal"
        type="datetimerange"
        prefix-icon="el-icon-date"
        editable
        :picker-options="pickerOptions"
        range-separator="至"
        value-format="yyyy-MM-dd HH:mm:ss"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
        style="margin-right: 10px"
      >
      </el-date-picker>
      <!-- 选择器 -->
      <el-select
        v-model="searchParams.enabled"
        placeholder="状态"
        @change="handlerSelect"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- 按钮 -->
      <el-button type="success" icon="el-icon-search" @click="searchUser">
        搜索
      </el-button>
      <el-button
        type="warning"
        icon="el-icon-refresh"
        @click="resetSearchParams"
      >
        重置
      </el-button>
    </div>
    <!-- 按钮区域 -->
    <div class="buttonArea">
      <el-button type="success" icon="el-icon-plus" @click="addUser">
        新增
      </el-button>
      <el-button type="warning" icon="el-icon-edit">修改</el-button>
      <el-button type="danger" icon="el-icon-delete">删除</el-button>
      <el-button type="primary" icon="el-icon-download">导出</el-button>
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
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          min-width="60px"
          class="hid"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="昵称"
          width="80px"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="50">
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="120">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="部门" width="90px" prop="dept.name">
        </el-table-column>
        <el-table-column label="状态" width="70px" align="center">
          <template slot-scope="{ row }">
            <el-switch
              v-model="row.enabled"
              active-color="#409EFF"
              inactive-color="#ff4949"
              @change="handleSwitchChange(row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建日期"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="{ row }">
            <el-button
              @click="updateUser(row)"
              type="primary"
              size="mini"
              icon="el-icon-edit"
            >
            </el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deletUser(row)"
            >
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器       :page-size="searchParams.size"         -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchParams.page + 1"
        :page-sizes="[10, 20, 30, 40, 100, 200]"
        :page-size="searchParams.size"
        layout="total,  prev, pager, next,sizes"
        :total="total"
      >
      </el-pagination>
    </div>
    <AddOrUpdateUser
      ref="addOrUpdateFormRef"
      v-on:updateuserlist="resetSearchParams"
    ></AddOrUpdateUser>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import AddOrUpdateUser from './addOrUpdateUser.vue'
// 导入深拷贝
import cloneDeep from 'lodash/cloneDeep'
// 初始的搜索参数
const searchParams = {
  blurry: '', // 模糊的
  'createTime[0].date': undefined,
  'createTime[0].day': undefined,
  'createTime[0].hours': undefined,
  'createTime[0].minutes': undefined,
  'createTime[0].month': undefined,
  'createTime[0].nanos': undefined,
  'createTime[0].seconds': undefined,
  'createTime[0].time': undefined,
  'createTime[0].timezoneOffset': undefined,
  'createTime[0].year': undefined,
  deptId: undefined,
  deptIds: [],
  enabled: undefined,
  id: undefined,
  page: 0,
  size: 10,
  sort: ['id,desc']
}
export default {
  name: 'rightTable',
  components: { AddOrUpdateUser },
  data () {
    return {
      // 日期pick
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
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
      total: 1
    }
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
      this.searchParams.deptId = newVal
      this.getUsersList()
    },
    deptIds (newVal) {
      this.searchParams.deptIds = newVal
      this.getUsersList()
    }
  },
  mounted () {
    // 获取用户列表
    this.getUsersList()
  },
  methods: {
    // 获取用户列表数据
    getUsersList () {
      // console.log(this.searchParams)
      this.$api.users.reqGetUsersList(this.searchParams).then((res) => {
        this.usersList = res.content
        this.total = res.totalElements
      })
    },
    updateUser (user) {
      this.$refs.addOrUpdateFormRef.initSelectTree()
      const obj = cloneDeep(user)
      obj.jobs = obj.jobs.map((item) => item.id)
      obj.roles = obj.roles.map((item) => item.id)
      delete obj.dept.name
      console.log(obj)
      this.$refs.addOrUpdateFormRef.addOrUpdateFormData = obj
      this.$refs.addOrUpdateFormRef.addOrUpdatedialogFormVisible = true
    },
    // 点击搜索时候的事件
    searchUser () {
      //! 需要将页码改为初始状态
      this.searchParams.page = 0
      this.getUsersList()
    },
    // 页码变化
    handleSizeChange (size) {
      this.searchParams.size = size
      this.getUsersList()
    },
    // 页面size发生变化
    handleCurrentChange (page) {
      this.searchParams.page = page - 1
      this.getUsersList()
    },
    //  选择器修改的时候,回调函数
    handlerSelect (enabled) {
      this.searchParams.enabled = enabled
    },
    // 重置参数
    resetSearchParams () {
      // 将默认参数定义成常量
      // !合并参数,为什么前面是一个空对象呢,这样这个对象上门都会存在getter和 setter
      this.searchParams = Object.assign({}, searchParams)
      this.getUsersList()
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
            await this.$api.users.reqUpdateUser(user)
            // 重新获取数据
            this.getUsersList()
            this.$message({
              type: 'success',
              message: '更新成功!'
            })
          } catch (error) {
            this.$message({
              type: 'info',
              message: error.message
            })
          }
        })
        .catch(() => {
          // 更新失败
          // 也需要重新发请求 ??
          user.enabled = !user.enabled
          this.$message({
            type: 'warning',
            message: '更新失败'
          })
        })
    },

    // 删除用户
    deletUser (row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 发请求删除用户
          await this.$api.users.reqDeleteUser([row.id])
          // 重新获取数据,需要判断删除之后的
          if (this.usersList.length < 1) {
            this.searchParams.page = this.searchParams.page - 1
          }
          this.getUsersList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 点击增加按钮 需解决数据回显
    addUser () {
      this.$refs.addOrUpdateFormRef.addOrUpdatedialogFormVisible = true
    }
  }
}
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
