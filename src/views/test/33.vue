<template>
  <div class="aaa">
    <z-dialog
        :title="title"
        :show.sync="dialogVisible"
        width="400px"
        :is-footer="false">
      <div slot="body">
        对话框body
      </div>
      <div slot="footer">
        对话框footer
      </div>
    </z-dialog>
  </div>
</template>
<script>
import ZDialog from './22.vue'

export default {
  name: '',
  components: { ZDialog },
  data () {
    return {
      title:'提示',
      dialogVisible: true
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

</style>
