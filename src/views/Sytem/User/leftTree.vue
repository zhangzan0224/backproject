<template>
  <!-- @keyup.enter.native="search" -->
  <div class="leftTree">
    <el-input
      placeholder="请输入部门名称搜索"
      prefix-icon="el-icon-search"
      v-model="filterText"
      clearable
      @change="search"
      @clear="clear"
    >
    </el-input>
    <!-- 树状图        -->
    <el-tree
      :props="treeProps"
      :load="loadNode"
      :data="treeData"
      lazy
      ref="tree"
      node-key="id"
      @node-click="handleTreeNodeClick"
      :filter-node-method="filterNode"
    >
    </el-tree>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
// 引入防抖函数
// import debounce from 'lodash/debounce'
export default {
  name: 'leftTree',
  components: {},
  data () {
    return {
      filterText: undefined, // 树状图搜索关键字
      /*
       *由于在点击节点时才进行该层数据的获取，默认情况下 Tree 无法预知某个节点是否为叶子节点，所以会为每个节点添加一个下拉按钮，如果节点没有下层数据，则点击后下拉按钮会消失。同时，你也可以提前告知 Tree 某个节点是否为叶子节点，从而避免在叶子节点前渲染下拉按钮。
       */
      treeProps: {
        label: 'name', // 指定节点标签为节点对象的某个属性值
        children: 'hasChildren', // 指定子树为节点对象的某个属性值
        isLeaf: 'leaf' //! 指定子树为节点对象的某个属性值,需要两个属性可以提前告知tree的节点是否为叶子节点,避免了叶子节点前渲染下拉按钮
      },
      filterArr: [],
      treeData: []
    }
  },
  // 计算属性
  computed: {
    ...mapState('user', ['deptId', 'deptIds'])
  },
  watch: {
    // 观察,当它变化时候,tree执行filter
    filterText (val) {
      this.filterArr = []
      this.$refs.tree.filter(val)
    },
    filterArr (newval) {
      setTimeout(() => {
        this.SET_USER_DEPT_IDS(newval)
      }, 100)
    }
  },
  mounted () {},
  methods: {
    async clear () {
      const { content } = await this.$api.department.reqGetDept({})
      this.treeData = content
    },
    async search () {
      const { content } = await this.$api.department.reqGetDept({
        name: this.filterText
      })
      // console.log(content)
      this.treeData = content
    },
    async loadNode (node, resolve) {
      // !node.data 得到点击的数据
      // 复杂写法
      // console.log(resolve)
      // if (node.level === 0) {
      //   const { content } = await this.$api.department.reqGetDept()
      //   // console.log(content)
      //   setTimeout(() => {
      //     return resolve(content)
      //   }, 100)
      // } else {
      //   const { content } = await this.$api.department.reqGetDept({
      //     pid: node.data.id
      //   })
      //   setTimeout(() => {
      //     return resolve(content)
      //   }, 100)
      // }
      try {
        const { content } = await this.$api.department.reqGetDept({
          pid: node.data?.id // !es6的写法,node.data是否存在,存在的话就可以.id,当等级是0的时候,node.data是undefined的,新增链式运算符 https://es6.ruanyifeng.com/#docs/operator,
        })
        //   // console.log(content)
        //  延迟展示,否则会出现闪动
        setTimeout(() => {
          return resolve(content)
        }, 100)
      } catch (error) {
        this.$message.error(error.message)
      }
    },

    // 树状图搜索
    filterNode (value, data, node) {
      if (!value) return true
      if (node.data.name.includes(value)) {
        this.filterArr.push(node.data.id)
      }
      return node.data.name.indexOf(value) !== -1
    },
    ...mapMutations('user', ['SET_USER_DEPT_ID', 'SET_USER_DEPT_IDS']),
    // 树状图点击
    handleTreeNodeClick (data) {
      this.SET_USER_DEPT_ID(data.id)
    }
  }
}
</script>
<style lang="scss" scoped>
.leftTree {
  width: 180px;
  height: 100%;
  // border: 1px solid #ccc;
  float: left;
  padding: 10px;
}
.el-input {
  margin-bottom: 10px;
}
</style>
