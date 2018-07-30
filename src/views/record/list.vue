<template lang="html">
  <div class="container">
    <Breadcrumb :items="breadcrumb"></Breadcrumb>
    <el-table :data="records" class="c-table">
      <el-table-column label="委托方案" prop="title" width="160"></el-table-column>
      <el-table-column label="所属工程" prop="project.name" width="160"></el-table-column>
      <el-table-column label="委托单位" prop="entity"></el-table-column>
      <el-table-column label="委托人" prop="principal.name"></el-table-column>
      <el-table-column label="创建人" prop="creater.name"></el-table-column>
      <el-table-column label="操作" fixed="right" width="100">
        <template slot-scope="scope">
          <el-button @click="detailRecord(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      breadcrumb: [
        { label: '记录' },
        { label: '记录管理' }
      ]
    }
  },
  computed: {
    ...mapGetters(['records'])
  },
  mounted: function () {
    this.initRecordTable()
  },
  methods: {
    ...mapActions(['initRecordTable']),
    detailRecord: row => {
      console.log(row)
    }
  },
  components: {
    Breadcrumb: Breadcrumb
  }
}
</script>

<style lang="css">
.c-table{
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
</style>
