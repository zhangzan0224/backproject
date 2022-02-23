<template>
  <!--type: 风格类型 -->
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    @tab-click="tabClick"
    @tab-remove="removeTab"
  >
    <!--
      label: 选项卡的标题
      name: 与选项卡绑定值 value 对应的标识符，表示选项卡别名
      closable: 标签是否可关闭
    -->
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
      :closable="item.name !== '/home'"
    >
      <span slot="label">
        <i class="el-icon-location" v-show="item.name === editableTabsValue"></i
        >{{ item.title }}</span
      >
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      editableTabsValue: '/home', // tab绑定的值，选中选项卡的 name
      // tab页的数组
      editableTabs: [
        {
          title: '主页',
          name: '/home'
        }
      ]
    }
  },
  // 计算属性
  computed: {},
  watch: {
    $route (to, from) {
      this.addEditableTabsValue(to)
    }
  },
  mounted () {
    this.addEditableTabsValue(this.$route)
  },
  methods: {
    // tab标签页移除事件
    removeTab (targetName) {
      const tabs = this.editableTabs
      let activeName = this.editableTabsValue
      // !判断激活的标签页是否和点击的一样? 如果一样,则需要往后或者往前跳转一个目录
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            // console.log(nextTab)
            // ! 如果都删除了,则nextTab为undefined
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.editableTabsValue = activeName
      // 路由跳转
      this.$router.push(activeName)
      // 通过filter将数组重新进行赋值,
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName)
    },
    // tab点击事件 被选中的标签 tab 实例
    tabClick (tab) {
      // console.log('###', tab)
      this.$router.push(tab.name)
      if (tab.name !== '/home') {
        this.$store.commit('SET_SECOND_AND_THIRD_MENU', [
          tab.$route.matched[0].meta.title,
          tab.$route.matched[1].meta.title
        ])
      } else {
        //! 如果点击的是主页,需要给面包屑,传递两个undefined的值,undefined的值为不显示.
        this.$store.commit('SET_SECOND_AND_THIRD_MENU', [undefined, undefined])
      }
    },
    // tab标签页添加元素
    addEditableTabsValue (to) {
      const obj = { title: to.meta.title, name: to.path }
      // 需判断数组中是否具有重复对象
      const findIndex = this.editableTabs.findIndex(
        (item) => item.name === obj.name
      )
      // console.log(findIndex)
      // 使用 some 和every 方法
      // const index = this.editableTabs.some((item) => item.name === obj.name)
      // console.log(index)
      if (findIndex < 0) {
        this.editableTabs.push(obj)
      }
      this.editableTabsValue = obj.name
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-tabs__header {
  margin: 0;
}
.el-tabs ::v-deep .el-tabs__header {
  border: none !important;
  ::v-deep .el-tabs__nav-wrap {
    border: none !important;
  }
}
.el-tabs ::v-deep .el-tabs__nav-scroll .el-tabs__item:first-child {
  margin-left: 10px;
  border-left: 1px solid #e4e7ed !important;
}
::v-deep .el-tabs__nav {
  border: none !important;
}
::v-deep .el-tabs__item {
  background-color: white;
  height: 32px;
  line-height: 32px;
  border-radius: 5px;
  color: black;
  font-size: 14px;
  margin-right: 6px;
  padding: 0 10px !important;
  border: 1px solid #e4e7ed !important;
}
::v-deep .el-tabs__item.is-active {
  background-color: #42b983;
  color: white;
}
</style>
