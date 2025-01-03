<template>
  <div style="padding:20px">
    <el-table :data="tableData6" :span-method="objectSpanMethod" border>
      <el-table-column prop="district" label="district" width="180" />
      <el-table-column prop="sourceTypeDesc" label="姓名" />
      <el-table-column prop="diagnosisCode" label="数值 1（元）" />
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
          district: '案件使用区',
          caseno: '662211001545',
          correctMtsCode: '',
          correctMtsDesc: '',
          diagnosisCode: 'A00.000x001',
          diagnosisDesc: '古典生物型霍乱',
          mtsDiagnosisCode: '',
          mtsDiagnosisDesc: '',
          scope: '1',
          sourceType: '6',
          sourceTypeDesc: '人工填写诊断（代理人）',
          index: 0
        },
        {
          district: '案件使用区',
          caseno: '662211001545',
          correctMtsCode: '',
          correctMtsDesc: '',
          diagnosisCode: 'A00.900',
          diagnosisDesc: '霍乱',
          mtsDiagnosisCode: '',
          mtsDiagnosisDesc: '',
          scope: '1',
          sourceType: '6',
          sourceTypeDesc: '人工填写诊断（代理人）',
          index: 1
        },
        {
          district: '案件使用区',
          caseno: '662211001545',
          correctMtsCode: '',
          correctMtsDesc: '',
          diagnosisCode: '',
          diagnosisDesc: '测试',
          mtsDiagnosisCode: '',
          mtsDiagnosisDesc: '',
          scope: '1',
          sourceType: '6',
          sourceTypeDesc: '人工填写诊断（代理人）',
          index: 2
        },
        {
          district: '案件使用区',
          caseno: '662211001545',
          correctMtsCode: '',
          correctMtsDesc: '',
          diagnosisCode: 'A00.000',
          diagnosisDesc: '霍乱，由于O1群霍乱弧菌，霍乱生物型所致',
          mtsDiagnosisCode: '',
          mtsDiagnosisDesc: '',
          scope: '1',
          sourceType: '6',
          sourceTypeDesc: '人工填写诊断（代理人）',
          index: 3
        },
        {
          district: '已获取诊断区',
          caseno: '662211001545',
          correctMtsCode: '',
          correctMtsDesc: '',
          diagnosisCode: 'A00.000x001',
          diagnosisDesc: '古典生物型霍乱',
          mtsDiagnosisCode: '',
          mtsDiagnosisDesc: '',
          scope: '1',
          sourceType: '6',
          sourceTypeDesc: '人工填写诊断（代理人）',
          index: 4
        },
        {
          district: '已获取诊断区',
          caseno: '662211001545',
          correctMtsCode: '',
          correctMtsDesc: '',
          diagnosisCode: 'A00.900',
          diagnosisDesc: '霍乱',
          mtsDiagnosisCode: '',
          mtsDiagnosisDesc: '',
          scope: '1',
          sourceType: '6',
          sourceTypeDesc: '人工填写诊断（代理人）',
          index: 5
        },
        {
          district: '已获取诊断区',
          caseno: '662211001545',
          correctMtsCode: '',
          correctMtsDesc: '',
          diagnosisCode: '',
          diagnosisDesc: '测试',
          mtsDiagnosisCode: '',
          mtsDiagnosisDesc: '',
          scope: '1',
          sourceType: '6',
          sourceTypeDesc: '人工填写诊断（代理人）',
          index: 6
        },
        {
          district: '已获取诊断区',
          caseno: '662211001545',
          correctMtsCode: '',
          correctMtsDesc: '',
          diagnosisCode: 'A00.000',
          diagnosisDesc: '霍乱，由于O1群霍乱弧菌，霍乱生物型所致',
          mtsDiagnosisCode: '',
          mtsDiagnosisDesc: '',
          scope: '1',
          sourceType: '6',
          sourceTypeDesc: '人工填写诊断（代理人）',
          index: 7
        },
        {
          district: '已获取诊断区',
          caseno: '662211001545',
          correctMtsCode: '',
          correctMtsDesc: '',
          diagnosisCode: 'A00.000',
          diagnosisDesc: '霍乱，由于O1群霍乱弧菌，霍乱生物型所致',
          mtsDiagnosisCode: 'A00.000',
          mtsDiagnosisDesc: '霍乱，由于O1群霍乱弧菌，霍乱生物型所致',
          scope: '2',
          sourceType: '3',
          sourceTypeDesc: '入院诊断-提档登记',
          index: 8
        },
        {
          district: '已获取诊断区',
          caseno: '662211001545',
          correctMtsCode: '',
          correctMtsDesc: '',
          diagnosisCode: 'A00.000x001',
          diagnosisDesc: '古典生物型霍乱',
          mtsDiagnosisCode: 'A00.000x001',
          mtsDiagnosisDesc: '古典生物型霍乱',
          scope: '2',
          sourceType: '3',
          sourceTypeDesc: '入院诊断-提档登记',
          index: 9
        },
        {
          district: '已获取诊断区',
          caseno: '662211001545',
          correctMtsCode: '',
          correctMtsDesc: '',
          diagnosisCode: 'A00.900',
          diagnosisDesc: '霍乱',
          mtsDiagnosisCode: 'A00.900',
          mtsDiagnosisDesc: '霍乱',
          scope: '2',
          sourceType: '3',
          sourceTypeDesc: '入院诊断-提档登记',
          index: 10
        },
        {
          district: '已获取诊断区',
          caseno: '662211001545',
          correctMtsCode: '',
          correctMtsDesc: '',
          diagnosisCode: '',
          diagnosisDesc: '测试',
          mtsDiagnosisCode: '',
          mtsDiagnosisDesc: '',
          scope: '2',
          sourceType: '3',
          sourceTypeDesc: '入院诊断-提档登记',
          index: 11
        }
      ]
    };
  },
  methods: {
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
