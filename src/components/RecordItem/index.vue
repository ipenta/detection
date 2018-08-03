<template lang="html">
  <el-table :data="data" style="width: 100%">
    <el-table-column prop="inspection.text" label="材料项目名称" width="120"></el-table-column>
    <el-table-column prop="inspection.type" label="检测类别"></el-table-column>
    <el-table-column prop="manufacturer" label="生产厂家"></el-table-column>
    <el-table-column prop="inspection.price" label="收费标准"></el-table-column>
    <el-table-column prop="number" label="检测数量"></el-table-column>
    <el-table-column prop="summary" label="金额小计">
      <template slot-scope="scope">
        {{scope.row.number * scope.row.inspection.price}}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      data: [{
        inspection: {
          text: '',
          type: '',
          price: ''
        },
        manufacturer: '',
        number: '',
        summary: ''
      }]
    }
  }
}
</script>

<style lang="css">
</style>
