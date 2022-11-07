<template>
  <div>
    <el-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange">
      全选
    </el-checkbox>
    <div style="margin: 15px 0" />
    <el-checkbox-group
        v-model="checkedCities"
        @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :key="city.code" :label="city.code">
        {{ city.name }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
const cityOptions = [
  { code: 1, name: '上海' },
  { code: 2, name: '北京' },
  { code: 3, name: '广州' },
  { code: 4, name: '深圳' }
];
export default {
  data () {
    return {
      checkAll: false,
      checkedCities: [1, 2],
      cities: cityOptions,
      isIndeterminate: true
    };
  },
  methods: {
    handleCheckAllChange (val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange (value) {
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>
