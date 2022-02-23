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
        v-model="value2"
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
      <el-button
        type="success"
        icon="el-icon-plus"
        @click="addOrUpdatedialogFormVisible = true"
      >
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
    <!-- 新增用户和修改用户对话框 -->
    <el-dialog title="新增用户" :visible.sync="addOrUpdatedialogFormVisible">
      <el-form :inline="true" v-model="addOrUpdateForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addOrUpdateForm.username"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addOrUpdateForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="addOrUpdateForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addOrUpdateForm.email"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-select
            v-model="addOrUpdateForm.dept"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入部门"
          >
            <el-option
              v-for="item in treeData"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位">
          <el-select
            placeholder="选择岗位"
            v-model="addOrUpdateForm.jobs.name"
            style="width: 180px"
          >
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addOrUpdateForm.gender" style="width: 180px">
            <el-radio label="男" value="男">男</el-radio>
            <el-radio label="女" vlaue="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group
            v-model="addOrUpdateForm.enabled"
            style="width: 180px"
          >
            <el-radio :label="true" :value="true">激活</el-radio>
            <el-radio :label="false" :value="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色">
          <el-select
            v-model="addOrUpdateForm.roles"
            style="width: 250%"
            placeholder="请选择"
            multiple
          >
            <el-option
              :label="role.name"
              :value="role.id"
              v-for="role in allRolesList"
              :key="role.id"
              :data-dataScope="role.dataScope"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="addOrUpdatedialogFormVisible = false"
          style="border: none; outline: none"
          >取 消</el-button
        >
        <el-button type="primary" @click="addOrUpdatedialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
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
  sort: ['id,asc']
}
export default {
  name: 'rightTable',
  components: {},
  data () {
    return {
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
      value2: '',
      selectValue: '', // 选择器的值
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
      // 全局角色数组
      allRolesList: [],
      addOrUpdatedialogFormVisible: false, // 对话框的状态
      // 添加或者修改的表单数据
      addOrUpdateForm: {
        dept: {
          // deptSort: 0,
          // enabled: true,
          // name: 'string',
          // pid: 0,
          // roles: []
        },
        email: '',
        enabled: true,
        gender: '男',
        jobs: [
          // {
          //   enabled: true,
          //   jobSort: 0,
          //   name: 'string'
          // }
        ],
        nickName: '',
        password: 'string',
        phone: '',
        roles: [
          // {
          // dataScope: 'string',
          // description: 'string',
          // level: 0
          // }
        ],
        username: ''
      },
      // 部门
      treeData: [],
      treeProps: {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf'
      }
      // 搜索参数
      // searchParams: Object.assign({}, searchParams)
    }
  },
  // 计算属性
  computed: {
    ...mapState({
      usersList: (state) => state.user.usersList,
      total: (state) => state.user.total,
      searchParams: (state) => state.user.searchParams
    })
  },
  watch: {},
  mounted () {
    // 获取用户列表
    this.getUsersList()
    // 获取全局角色
    this.getAllRoles()
  },
  methods: {
    // 获取用户列表数据
    getUsersList () {
      console.log(this.searchParams)
      this.$store.dispatch('getUsersList', this.searchParams)
    },
    updateUser (user) {
      // console.log(user)
      this.addOrUpdateForm = cloneDeep(user)
      this.addOrUpdatedialogFormVisible = true
    },
    // 点击搜索时候的事件
    searchUser () {
      //! 需要将页码改为初始状态
      this.searchParams.page = 0
      this.getUsersList()
    },

    handleSizeChange (size) {
      this.searchParams.size = size
      this.getUsersList()
    },
    handleCurrentChange (page) {
      this.searchParams.page = page - 1
      this.getUsersList()
    },
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
    // 获取全部角色
    async getAllRoles () {
      const result = await this.$api.role.reqAllRoles()
      // console.log(result)
      this.allRolesList = result
    },
    // 删除用户
    deletUser (row) {
      // console.log(row.id)
      // console.log(row)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 发请求删除用户
          await this.$api.users.reqDeleteUser([row.id])
          this.getUsersList(this.searchParams)
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
