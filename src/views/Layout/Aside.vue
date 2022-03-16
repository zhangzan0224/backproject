<template>
  <el-aside
      :width="isCollapse ? '60px' : '200px'"
      style="background-color: #304156; transition: width 0.2s linear">
    <a>
      <img src="~@/assets/imgs/logo.png" alt="" />
      <strong v-if="!isCollapse">
        SCDQ-后台管理
      </strong>
    </a>
    <el-menu
        unique-opened
        background-color="#304156"
        text-color="#fff"
        router
        :collapse="isCollapse"
        :default-active="defaultActive">
      <!-- 主页  style="padding"-->
      <el-menu-item index="/home" @click="menuClick({}, {})">
        <i class="el-icon-setting" />
        <span slot="title">主页</span>
      </el-menu-item>
      <!-- 带二级菜单的 -->
      <el-submenu v-for="menu in menuList" :key="menu.path" :index="menu.path">
        <template slot="title">
          <i class="el-icon-message" />
          <span slot="title">{{ menu.meta.title }}</span>
        </template>
        <el-menu-item
            v-for="menuchild in menu.children"
            :key="menuchild.path"
            :index="menu.path + '/' + menuchild.path"
            @click="menuClick(menu, menuchild)">
          <template>
            <i class="el-icon-setting" />
            <span slot="title">{{ menuchild.meta.title }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data () {
    return {
      isCollapse: false, // 默认不折叠
      defaultActive: localStorage.getItem('active') || '/home' // 默认激活链接 需要持久化
    };
  },
  mounted () {
    // 全局事件总线,绑定一个changeIsCollapse事件,收到其他组件的值,来更改当前组件的值
    this.$bus.$on('changeIsCollapse', (isCollapse) => {
      this.isCollapse = isCollapse;
    });
  },
  methods: {
    menuClick (menu, menuchild) {
      // console.log('@@', menu)
      const arr = [];
      arr.push(menu?.meta?.title);
      arr.push(menuchild?.meta?.title);
      // console.log(obj)
      this.$store.commit('SET_SECOND_AND_THIRD_MENU', arr);
    }
  },
  watch: {
    $route (to, from) {
      // console.log(to)
      this.defaultActive = to.path;
      window.localStorage.setItem('active', to.path);
    }
  },
  computed: {
    ...mapState({
      menuList: (state) => state.menu
    })
  }
};
</script>

<style lang="scss" scoped>
a {
  display: block;
  margin: 0px auto;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  img {
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }
  strong {
    margin-left: 4px;
    font-size: 14px;
    color: white;
  }
}
.el-menu {
  // 去掉菜单栏最右侧的边框
  border: none;
}
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: #363445 !important;
}
::v-deep .el-submenu__title:hover {
  background-color: #363445 !important;
}
</style>
