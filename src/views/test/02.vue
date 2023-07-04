<template>
  <div style="padding:20px">
    <el-table :data="tableData6" :span-method="objectSpanMethod" border>
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="amount1" label="数值 1（元）" />
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      spanArr: [], // 用于存放每一行记录的合并数
      tableData6: [
        {
          id: '1',
          name: '王小虎',
          amount1: '234'
        },
        {
          id: '1',
          name: '王小虎',
          amount1: '165'
        },
        {
          id: '2',
          name: '王小虎1',
          amount1: '324'
        },
        {
          id: '2',
          name: '王小虎1',
          amount1: '621'
        },
        {
          id: '2',
          name: '王小虎2',
          amount1: '539'
        }
      ]
    };
  },
  mounted: function () {
    this.getSpanArr(this.tableData6);
  },
  methods: {
    getSpanArr (data) {
      // data就是我们从后台拿到的数据
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].name === data[i - 1].name) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
        console.log(this.spanArr);
      }
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        console.log(`rowspan:${_row} colspan:${_col}`);
        return {
          // [0,0] 表示这一行不显示， [2,1]表示行的合并数
          rowspan: _row,
          colspan: _col
        };
      }
    }
  }
};
</script>
