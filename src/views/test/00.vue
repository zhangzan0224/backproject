<!--
 * @Description: 下拉选项单选
 * @Version: 2.0
 * @Author: ZhangZan
 * @Date: 2023-05-07 08:39:11
 * @LastEditors: ZhangZan
 * @LastEditTime: 2023-05-07 08:52:34
-->
<template>
  <div>
    <el-select v-model="value1"
        placeholder="请选择"
        clearable
        @change="handleChange">
      <el-option
          v-for="item in computeDifferenceSet(value1)"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
    </el-select>
    <el-select v-model="value2"
        placeholder="请选择"
        clearable
        @change="handleChange">
      <el-option
          v-for="item in computeDifferenceSet(value2)"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
    </el-select>
    <el-select v-model="value3"
        placeholder="请选择"
        clearable
        @change="handleChange">
      <el-option
          v-for="item in computeDifferenceSet(value3)"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
    </el-select>
    <el-select v-model="value4"
        placeholder="请选择"
        clearable
        @change="handleChange">
      <el-option
          v-for="item in computeDifferenceSet(value4)"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
    </el-select>
    <el-select v-model="value5"
        placeholder="请选择"
        clearable
        @change="handleChange">
      <el-option
          v-for="item in computeDifferenceSet(value5)"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
    </el-select>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [// 全部选项
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      selectOption:['', '', '', '', ''], // 每个选择器的选中项
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: ''
    };
  },
  created () {},
  mounted () {},
  methods: {
    handleChange (abc) { // 选择器选项改变时
      this.selectOption = [this.value1, this.value2, this.value3, this.value4, this.value5]
      console.log(this.selectOption)
    },
    computeDifferenceSet (currentSelectValue) { // 计算每个下拉菜单的可以选中的选项
      const remainingOption = this.options.filter((item)=>{
        return this.selectOption.indexOf(item.value) === -1 || currentSelectValue === item.value
      })
      return remainingOption
    }
  }
};
</script>
