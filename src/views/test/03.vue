<template>
  <div style="padding:20px">
    <el-table :data="tableData" :span-method="objectSpanMethod" border>
      <el-table-column prop="district" label="district" />
      <el-table-column prop="sourceTypeDesc" label="姓名" />
      <el-table-column prop="diagnosisCode" label="111" />
      <el-table-column prop="diagnosisDesc" label="2222" />
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [
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
          scope: '2',
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
          scope: '2',
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
          scope: '2',
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
          scope: '2',
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
    // 帮我写一个方法实现第一列根据district合并，第二列合并的前提是district是一样的
    objectSpanMethod ({ rowIndex, columnIndex }) {
      // 第一列如果district都一样进行合并
      if (columnIndex === 0) {
        const currentRow = this.tableData[rowIndex]
        const previousRow = this.tableData[rowIndex - 1]
        if (rowIndex > 0 && currentRow.district === previousRow.district) {
          // 如果当前行与上一行的 district 相同，合并当前行的第一列
          return { rowspan: 0, colspan: 0 } // 当前行的 district 列不显示
        }
        // 如果当前行与上一行的 district 不同，则显示当前行的 district
        let rowspan = 1
        // 计算连续相同 district 的行数
        for (let i = rowIndex + 1; i < this.tableData.length; i++) {
          if (this.tableData[i].district === currentRow.district) {
            rowspan++
          } else {
            break
          }
        }
        return { rowspan, colspan: 1 } // 返回合并后的行数
      } else if (columnIndex === 1) { // 针对 sourceTypeDesc 列进行判断
        const currentRow = this.tableData[rowIndex]
        const previousRow = this.tableData[rowIndex - 1]
        if (rowIndex > 0 && currentRow.sourceTypeDesc === previousRow.sourceTypeDesc && currentRow.scope === previousRow.scope) {
          // 如果当前行与上一行的 sourceTypeDesc 相同，合并当前行的第一列
          return { rowspan: 0, colspan: 0 } // 当前行的 sourceTypeDesc 列不显示
        }
        // 如果当前行与上一行的 sourceTypeDesc 不同，则显示当前行的 sourceTypeDesc
        let rowspan = 1
        // 计算连续相同 sourceTypeDesc 的行数
        for (let i = rowIndex + 1; i < this.tableData.length; i++) {
          if (this.tableData[i].sourceTypeDesc === currentRow.sourceTypeDesc && this.tableData[i].scope === currentRow.scope) {
            rowspan++
          } else {
            break
          }
        }
        return { rowspan, colspan: 1 } // 返回合并后的行数
      }
      return { rowspan: 1, colspan: 1 } // 其他列不合并
    }
    // objectSpanMethod({ rowIndex, columnIndex }) {
    //   if (columnIndex === 0) {
    //     const currentRow = this.tableData[rowIndex]
    //     const previousRow = this.tableData[rowIndex - 1]
    //     if (rowIndex > 0 && currentRow.district === previousRow.district) {
    //       return { rowspan: 0, colspan: 0 }
    //     }
    //     let rowspan = 1
    //     for (let i = rowIndex + 1; i < this.tableData.length; i++) {
    //       if (this.tableData[i].district === currentRow.district) {
    //         rowspan++
    //       } else {
    //         break
    //       }
    //     }
    //     return { rowspan, colspan: 1 }
    //   } else if (columnIndex === 1) {
    //     const currentRow = this.tableData[rowIndex]
    //     const previousRow = this.tableData[rowIndex - 1]

    //     if (rowIndex > 0 &&
    //       currentRow.sourceTypeDesc === previousRow.sourceTypeDesc &&
    //       currentRow.scope === previousRow.scope) {
    //       return { rowspan: 0, colspan: 0 }
    //     }

    //     let rowspan = 1
    //     for (let i = rowIndex + 1; i < this.tableData.length; i++) {
    //       if (
    //         this.tableData[i].sourceTypeDesc === currentRow.sourceTypeDesc &&
    //         this.tableData[i].scope === currentRow.scope) {
    //         rowspan++
    //       } else {
    //         break
    //       }
    //     }
    //     return { rowspan, colspan: 1 }
    //   }
    //   return { rowspan: 1, colspan: 1 }
    // }
  }
}
</script>
