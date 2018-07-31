<template lang="html">
  <div class="container">
    <p>检测项目明细</p>
    <router-link to="/inspection">新增检测项目</router-link>
    <el-table :data="data" border style="width: 100%; margin-top: 20px">
      <el-table-column label="材料项目名称" width="180">
      </el-table-column>
      <el-table-column
        prop="manufacturer"
        label="生产厂家">
      </el-table-column>
      <el-table-column
        prop="number"
        label="检测单价">
      </el-table-column>
      <el-table-column
        prop="number"
        label="检测数量">
      </el-table-column>
      <el-table-column
        prop="summary"
        label="金额小计">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import InspectionVO from '@/service/model/InspectionVO'
export default {
  data() {
    return {
      data: [{}],
      inspection: '',
      inspections: [],
      loading: false,
      detailsForm: {
        orderId: '',
        inspection: new InspectionVO(),
        manufacturer: '',
        number: ''
      }
    }
  },
  methods: {
    onSearchInspection: function (text) {
      if (text !== '') {
        this.$store.dispatch('searchInspection', {
          text: text
        }).then(context => {
          this.inspections = context
        })
      }
    }
  }
}
</script>

<style lang="css">
</style>
