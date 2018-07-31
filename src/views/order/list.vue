<template lang="html">
<div class="container">
  [<router-link to="/inspection">新增检测项目</router-link>][<router-link to="/entry/1">新增条目</router-link>]
  <p>检测项目</p>
  <el-table
  :data="data"
  border
  style="width: 100%; margin-top: 20px">
    <el-table-column
      prop="inspection.text"
      label="材料项目名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="inspection.type"
      label="检测类别">
    </el-table-column>
    <el-table-column
      prop="manufacturer"
      label="生产厂家">
    </el-table-column>
    <el-table-column
      prop="inspection.price"
      label="收费标准">
    </el-table-column>
    <el-table-column
      prop="number"
      label="检测数量">
    </el-table-column>
    <el-table-column
      prop="summary"
      label="金额小计">
      <template slot-scope="scope">
        {{scope.row.number * scope.row.inspection.price}}
      </template>
    </el-table-column>
  </el-table>
  {{columnTotal}}
</div>
</template>

<script>
export default {
  data() {
    return {
      orderId: this.$route.params.id,
      data: []
    }
  },
  mounted() {
    this.getTableData()
  },
  computed: {
    // 省略若干字段
    columnTotal() {
      return this.data.map(row => row.number * row.inspection.price).reduce((acc, cur) => (cur + acc), 0)
    }
  },
  methods: {
    getTableData: function() {
      this.$store.dispatch('getEntryByOrderId', { orderId: this.orderId }).then(result => {
        this.data = result
      })
    }
  }
}
</script>

<style lang="css">
</style>
