<template>
  <div class="layout">
    <el-container style="height: 100vh">
      <Myaside />
      <el-container style="flex-direction: column">
        <Myheader />
        <Tabs />
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { reqBuildMemu } from '@/apis/menus.js';
import Myaside from '@/views/Layout/Aside';
import Myheader from '@/views/Layout/Header';
import Tabs from '@/views/Layout/Tabs';
export default {
  data () {
    return {};
  },
  components: { Myaside, Myheader, Tabs },
  methods: {},
  mounted () {
    reqBuildMemu().then((result) => {
      // console.log(result)
    });
  }
};
</script>

<style lang="scss" scoped>
.el-main {
  padding: 10px;
}
</style>
