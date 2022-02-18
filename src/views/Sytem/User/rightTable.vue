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
      <el-button type="success" icon="el-icon-search" @click="getUsersList">
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
      <el-button type="success" icon="el-icon-plus"> 新增 </el-button>
      <el-button type="warning" icon="el-icon-edit"> 修改 </el-button>
      <el-button type="danger" icon="el-icon-delete"> 删除 </el-button>
      <el-button type="primary" icon="el-icon-download"> 导出 </el-button>
    </div>
    <!-- 表格区域 -->
    <div class="tableArea">
      <el-table
        ref="multipleTable"
        :data="usersList"
        style="width: 100%"
        border
        size="medium"
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
              @click="handleClick(row)"
              type="primary"
              size="mini"
              icon="el-icon-edit"
            >
            </el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete">
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
  </div>
</template>
<script>
import { mapState } from 'vuex'
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
      ]
    }
  },
  // 计算属性
  computed: {
    ...mapState({
      searchParams: (state) => state.user.searchParams,
      usersList: (state) => state.user.usersList,
      total: (state) => state.user.total
    })
  },
  watch: {},
  mounted () {
    this.getUsersList(this.searchParams)
  },
  methods: {
    handleClick () {
      // console.log(11)
    },
    getUsersList (params) {
      // console.log('@挂载的时候', params)
      this.$store.dispatch('getUsersList', params)
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.searchParams.size = val
      this.getUsersList(this.searchParams)
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.searchParams.page = val - 1
      this.getUsersList(this.searchParams)
    },
    handlerSelect (val) {
      this.searchParams.enabled = val
    },
    resetSearchParams () {
      this.searchParams.blurry = ''
      this.searchParams.enabled = undefined
      this.searchParams.page = 0
      this.getUsersList(this.searchParams)
    },
    // switch 开关进行修改
    async handleSwitchChange (val) {
      await this.$api.users.reqUpdateUser(val)
      // 重新获取数据
      this.getUsersList(this.searchParams)
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
