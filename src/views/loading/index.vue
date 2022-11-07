<template>
  <div v-show="visable" class="loading" :style="{ background }">
    {{ text }}
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      text: 'loading .... ',
      background: 'rgba(0,0,0,.3)',
      visable: false
    };
  },
  // 计算属性
  computed: {},
  watch: {},
  mounted () {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.loading {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
</style>
