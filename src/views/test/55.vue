<template>
  <div class="aa ">
    <button @click="show">
      点击
    </button>
    <vueCityPicker ref="picker" @select="select" />
  </div>
</template>
<script>
import vueCityPicker from 'vue-city-bspicker'
export default {
  name: '',
  components: { vueCityPicker },
  data () {
    var province = [{
      value: 110000,
      text: '北京市自定义',
      parentId: 0
    }]

    var city = [{
      value: 110100,
      text: '市辖区',
      parentId: 110000
    }]

    var area = [{
      value: 110101,
      text: '东城区',
      parentId: 110100
    }]
    return {
      data : [province, city, area]
    }
  },
  // 计算属性
  computed: {},
  watch: {},
  mounted () {},
  methods: {
    show: function () {
      this.$refs['picker'].show();
    },
    select: function () {
      console.log(arguments)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
