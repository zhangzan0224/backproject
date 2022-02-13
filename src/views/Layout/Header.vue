<template>
  <el-header style="text-align: right; font-size: 12px">
    <!-- 打开和关闭菜单 -->
    <div class="header-left">
      <div class="header-left-icon" @click="changeIsCollapse">
        <i v-if="!isCollapse" class="el-icon-s-fold"></i>
        <i v-else class="el-icon-s-unfold"></i>
      </div>
      <!-- 面包屑 -->
      <div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="secondMenu">
            {{ secondMenu }}
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="thirdMenu">
            {{ thirdMenu }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <!-- 下拉菜单 -->
    <div class="dropmenu">
      <i @click="fullScreen" class="el-icon-full-screen my-full-screen"></i>
      <el-dropdown>
        <img src="../../assets/imgs/avatar.png" alt="" />
        <i class="el-icon-arrow-down el-icon--right"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item style="font-size: 10px">个人中心</el-dropdown-item>
          <el-dropdown-item style="font-size: 10px">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script>
import screenfull from 'screenfull/dist/screenfull'
export default {
  name: '',
  components: {},
  data () {
    return {
      isCollapse: false,
      isFullscreen: false // 默认不全屏
    }
  },
  // 计算属性
  computed: {
    secondMenu () {
      return this.$store.state.secondAndThirdMenu[0]
    },
    thirdMenu () {
      return this.$store.state.secondAndThirdMenu[1]
    }
  },
  watch: {},
  mounted () {},
  methods: {
    fullScreen () {
      // 先使用screenfull.enabled方法判断是否支持screenfull
      // 如果不允许进入全屏，发出不允许提示 浏览器不能全屏
      if (!screenfull.enabled) {
        this.$message({
          message: '浏览器不能全屏，安装其他版本试试',
          type: 'warning'
        })
        return false
      }
      // 调用 screenfull.toggle() 可以双向切换全屏与非全屏
      screenfull.toggle()
      this.$message({
        message: '已全屏',
        type: 'success'
      })
    },
    // 更改折叠
    changeIsCollapse () {
      this.isCollapse = !this.isCollapse
      // 通知兄弟组件修改isCollapse属性
      this.$bus.$emit('changeIsCollapse', this.isCollapse)
    }
  }
}
</script>
<style lang="scss" scoped>
// 头部css
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-left {
    display: flex;
    align-items: center;
    // icons的大小可以通过字体大小来进行设置
    .header-left-icon {
      i {
        font-size: 20px;
      }
      margin-right: 16px;
    }
  }
  .el-dropdown {
    img {
      width: 36px;
      height: 36px;
      border-radius: 10px;
    }
  }
  .my-full-screen {
    font-size: 24px;
    margin-right: 8px;
  }
  .dropmenu {
    display: flex;
    align-items: center;
  }
}
</style>
