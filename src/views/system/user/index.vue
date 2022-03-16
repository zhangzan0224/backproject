<template>
  <div class="user">
    <left-tree />
    <right-table />
  </div>
</template>
<script>
import leftTree from '@/views/system/user/leftTree';
import rightTable from '@/views/system/user/rightTable';

export default {
  name: 'User',
  components: { leftTree, rightTable },
  data () {
    return {};
  },
  // 计算属性
  computed: {},
  watch: {},
  mounted () {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.user {
  height: 100%;
}
</style>
