<template>
  <div class="leftTree">
    <el-input
      placeholder="请输入部门名称搜索"
      prefix-icon="el-icon-search"
      v-model="filterText"
    >
    </el-input>
    <!-- 树状图 -->
    <el-tree
      :props="treeProps"
      :load="loadNode"
      lazy
      :data="treeData"
      :filter-node-method="filterNode"
      ref="tree"
      @node-click="handleTreeNodeClick"
    >
    </el-tree>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'leftTree',
  components: {},
  data () {
    return {
      filterText: '', // 树状图搜索关键字
      treeData: [],
      treeProps: {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf'
      }
    }
  },
  // 计算属性
  computed: {
    ...mapState({
      searchParams: (state) => state.user.searchParams
    })
  },
  watch: {
    // 观察,当它变化时候,tree执行filter
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted () {
    this.getTreeData()
  },
  methods: {
    // 获取树状数据
    async getTreeData (treeParams = {}, isParent = false) {
      const result = await this.$api.department.reqGetDept(treeParams)
      this.treeData = result.content
    },
    loadNode (node, resolve) {
      // console.log(node.level)
      if (node.level === 0) {
        return resolve([{ name: node.name }])
      }
      if (node.level > 2) return resolve([])
      if (node.level === 1) {
        // 二级节点
        this.getChildrenNode(node, resolve)
      }
      if (node.level === 2) {
        // 三级节点
        this.getChildrenNode(node, resolve)
      }
    },
    getChildrenNode (node, resolve) {
      this.$api.department
        .reqGetDept({ pid: node.data.id })
        .then((result) => {
          resolve(result.content)
        })
        .catch((err) => {
          return err
        })
    },
    // 树状图搜索
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 树状图点击
    handleTreeNodeClick (data, b, c) {
      // console.log(data)
      this.searchParams.deptId = data.id
      this.$store.dispatch('getUsersList', this.searchParams)
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
