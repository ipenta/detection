<template lang="html">
  <div class="container">
    <Breadcrumb :items="breadcrumb"></Breadcrumb>
    <div style="margin:0 12px;">
      <div class="f-header"><span>详细情况</span><el-button size="mini" @click="editRecordDetail" v-show="showConext" style="">修改</el-button></div>
      <el-form label-position="left" inline class="table-show" v-show="showConext">
        <el-form-item label="委托方案">
          <span>{{ record.title }}</span>
        </el-form-item>
        <el-form-item label="所属工程">
          <span>{{ record.project.name }}</span>
        </el-form-item>
       <el-form-item label="委托单位">
          <span>{{ record.entity.name }}</span>
        </el-form-item>
        <el-form-item label="委托人">
          <span>{{ record.principal.name }}</span>
        </el-form-item>
        <el-form-item label="委托人电话">
          <span>{{ record.principal.phonenum }}</span>
        </el-form-item>
      </el-form>
      <div v-if="!showConext">
        <RecordForm :content="record" @clean="onClean"></RecordForm>
      </div>
      <hr style="border:1px dotted #ddd;margin:20px;" />
      <DetailTable :recordId="recordId"></DetailTable>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import RecordForm from './RecordForm'
import DetailTable from './DetailTable'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      breadcrumb: [
        { label: '委托方案' },
        { label: '委托细节' }
      ],
      showConext: true
    }
  },
  computed: {
    ...mapGetters({
      inspection: 'inspection/inspections',
      record: 'record/record'
    }),
    recordId() {
      return this.$route.params.id
    },
    columnTotal() {
      return this.entries.map(row => row.number * row.inspection.price).reduce((acc, cur) => (cur + acc), 0) || ''
    }
  },
  mounted: function() {
    this.getRecordDetail({id: this.$route.params.id})
  },
  methods: {
    ...mapActions({
      getRecordDetail: 'record/detail',
      getEntryItem: 'entry/list'
    }),
    editRecordDetail() {
      this.showConext = false
    },
    onClean() {
      this.showConext = true
      this.getRecordDetail({id: this.recordId})
    }
  },
  components: {
    Breadcrumb: Breadcrumb,
    RecordForm: RecordForm,
    DetailTable: DetailTable
  }
}
</script>

<style lang="css">
.table-show{
  border: 1px solid #eee;
  padding: 16px;
}
.table-show .el-form-item{
  margin-right: 0;
  margin-bottom: 0;
  width: 45%;
}
.tfoot{
  color: #909399;
  line-height: 40px;
  background-color: #fdfdfd;
  padding: 0 10px;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: #f6f6f6;
}

.f-header{
  color: #909399;
  line-height: 48px;
  background-color: #fdfdfd;
  padding: 0 10px;
  font-size: 14px;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #f6f6f6;
}
</style>
