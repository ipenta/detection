<template lang="html">
  <div class="container">
    <Breadcrumb :items="breadcrumb"></Breadcrumb>
    <div style="margin:0 12px;">
      <p>委托方案 &nbsp;&nbsp;&nbsp;<el-button size="mini" @click="editRecordDetail" v-show="showConext">修改</el-button></p>
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
      <!-- <el-row type="flex" :gutter="24" style="margin-top:20px;margin-bottom:20px;">
        <el-col :span="4">
          <el-button size="small" @click="handleCreate">新增检测项目</el-button>
        </el-col>
      </el-row> -->
      <el-table :data="entries" style="width: 100%;">
        <el-table-column label="检测项名称" width="160">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.inspection"
              filterable
              remote
              value-key="text"
              reserve-keyword
              placeholder="请输入关键词获得材料项目名"
              :remote-method="searchInspections"
              size="small"
              :loading="loading">
              <el-option :value="scope.row.inspection" :label="scope.row.inspection.text" v-show="scope.row.inspection !== '' && inspections === ''"></el-option>
              <el-option
                v-for="item in inspections"
                :key="item._id"
                :label="item.text"
                :value="item">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="inspection.type" label="检测类别"></el-table-column>
        <el-table-column label="生产厂家">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.manufacturer"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="价格">
          <template slot-scope="scope">
            <span v-show="scope.row.inspection.price !== undefined && scope.row.inspection.unit !== undefined">
            {{scope.row.inspection.price + '/' + scope.row.inspection.unit || ''}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="检测数量">
          <template slot-scope="scope">
            <el-input-number style="width:100px" :min='1' size="small" v-model="scope.row.number"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="summary" label="金额小计">
          <template slot-scope="scope">
            {{scope.row.number * scope.row.inspection.price || ''}}
          </template>
        </el-table-column>
        <el-table-column prop="summary" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, data)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="tfoot">
        <span>总额：{{columnTotal}}</span>
        <el-button size="mini" type="danger" style="float:right;margin:10px 10px 0 0;" @click="onSubmitEntries">确认</el-button>
      </div>
    </div>
    {{entries}}
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import RecordForm from './RecordForm'
import EntryVO from '@/service/model/EntryVO'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      breadcrumb: [
        { label: '委托方案' },
        { label: '委托细节' }
      ],
      showConext: true,
      loading: false,
      entries: []
    }
  },
  computed: {
    ...mapGetters(['inspections', 'record']),
    recordId() {
      return this.$route.params.id
    },
    columnTotal() {
      return this.entries.map(row => row.number * row.inspection.price).reduce((acc, cur) => (cur + acc), 0) || ''
    }
  },
  mounted: function() {
    this.getRecordDetail({id: this.recordId})
    this.searchInspections()
  },
  methods: {
    ...mapActions(['getRecordDetail', 'searchInspections', 'submitEntries']),
    editRecordDetail() {
      this.showConext = false
    },
    onClean() {
      this.showConext = true
      this.getRecordDetail({id: this.recordId})
    },
    handleCreate() {
      // this.$store.commit('SET_ENTRIES', [].push(new EntryVO({recordId: this.recordId})))
      this.entries.push(new EntryVO({recordId: this.recordId}))
      console.log(this.entries)
    },
    onSubmitEntries() {
      this.submitEntries(this.entries)
    }
  },
  components: {
    Breadcrumb: Breadcrumb,
    RecordForm: RecordForm
  }
}
</script>

<style lang="css">
.table-show .el-form-item{
  margin-right: 0;
  margin-bottom: 0;
  width: 40%;
}
.tfoot{
  color: #909399;
  line-height: 50px;
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
</style>
