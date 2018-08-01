<template lang="html">
<div class="container">
  <Breadcrumb :items="breadcrumb"></Breadcrumb>
  <div style="margin:0 12px;">
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
  </div>
</div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      breadcrumb: [
        { label: '订单管理' },
        { label: '列表' }
      ],
      orderId: this.$route.params.id,
      data: []
    }
  },
  mounted() {
    this.getTableData()
  },
  computed: {
    ...mapGetters(['records']),
    columnTotal() {
      return this.data.map(row => row.number * row.inspection.price).reduce((acc, cur) => (cur + acc), 0)
    }
  },
  methods: {
    ...mapActions(['searchRecords']),
    getTableData: function() {
      this.searchRecords()
    }
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="css">
</style>
