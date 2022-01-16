<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px">
        <div class="logo">
          <img :src="logo" alt="logo" />
          <h5>后台管理系统</h5>
        </div>
        <el-menu
          unique-opened
          background-color="#304156"
          active-text-color="#409EFF"
          default-active="1"
          menu-trigger="click"
          text-color="#fff"
        >
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <!-- 一级菜单 -->
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">系统管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="2-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">用户管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <!-- 一级菜单 -->
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">aaa</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="3-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">ccc</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 面包屑 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 下拉菜单 -->
          <el-dropdown>
            <img src="../../assets/imgs/avatar.png" alt="" />
            <i class="el-icon-arrow-down el-icon--right"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import logo from '@/assets/imgs/logo.png'
export default {
  data () {
    return {
      logo
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  .el-container {
    height: 100%;
    // 侧边栏
    .el-aside {
      background-color: #304156;
      height: 100%;
      .logo {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        h5 {
          margin: 0;
          display: inline-block;
          color: white;
          height: 50px;
          line-height: 50px;
        }
        img {
          width: 32px;
          height: 32px;
          vertical-align: middle;
          margin-right: 6px;
        }
      }
      .el-menu {
        // 去掉菜单栏最右侧的边框
        border-right: 0;
      }
    }
    // 头部css
    .el-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .el-dropdown {
        img {
          width: 36px;
          height: 36px;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
