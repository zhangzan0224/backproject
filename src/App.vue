<template>
  <div id="app">
    <!-- <el-button type="primary" @click="showLoading">点我</el-button> -->
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {
    showLoading () {
      this.$load.show({
        text: '加载中>...',
        background: 'rgba(0,0,0,.9)'
      });
      setTimeout(() => {
        this.$load.hide();
      }, 2000);
    }
  }
};
</script>
<style></style>
