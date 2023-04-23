<template>
  <div class="aaa">
    <my-cascader
        :options="options"
        :is_deep="true"
        :has_all_select="true"
        @getOptions="getOptions" />
  </div>
</template>
<script>
import MyCascader from './77.vue'
export default {
  name: '',
  components: { MyCascader },
  data () {
    return {
      options: [
        { label:'全部', value: '' },
        {
          label: '一级 1',
          value: '1',
          children: [
            {
              label: '二级 1-1',
              value: '1-1'
            }
          ]
        },
        {
          label: '一级 2',
          value: '2',
          children: [
            {
              label: '二级 2-1',
              value: '2-1'
            }
          ]
        }
      ]
    }
  },
  // 计算属性
  computed: {},
  watch: {},
  mounted () {},
  methods: {
    getOptions (options) {
      console.log('options', options)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
