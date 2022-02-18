<template>
  <div class="user">
    <left-tree></left-tree>
    <right-table></right-table>
  </div>
</template>
<script>
import leftTree from '@/views/Sytem/User/leftTree'
import rightTable from '@/views/Sytem/User/rightTable'

export default {
  name: 'User',
  components: { leftTree, rightTable },
  data () {
    return {

    }
  },
  // 计算属性
  computed: {},
  watch: {},
  mounted () {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.user {
  height: 100%;
}
// display: -webkit-box;
// -webkit-line-clamp: 2;
// -webkit-box-orient: vertical;
// ::v-deep .cell {
//   max-height: 23px !important;
//   overflow: hidden !important;
//   white-space: nowrap !important; //一行显示
//   text-overflow: ellipsis; //是否显示省略号
// }
</style>
