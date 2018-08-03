<template lang="html">
<div class="detail-table">
  <el-row type="flex" :gutter="24" style="margin-top:20px;margin-bottom:20px;">
    <el-col :span="4">
      <el-button size="small" @click="handleCreate">新增检测项目</el-button>
    </el-col>
  </el-row>
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
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="tfoot">
    <span>总额：{{columnTotal}}</span>
    <el-button size="mini" type="danger" style="float:right;margin:10px 10px 0 0;" @click="onSubmitEntries">确认</el-button>
  </div>
</div>
</template>

<script>
import EntryVO from '@/service/model/EntryVO'
import { mapActions, mapGetters } from 'vuex'
import * as entryService from '@/service/entry'
export default {
  props: ['recordId'],
  data() {
    return {
      entries: [],
      loading: false
    }
  },
  mounted: function() {
    this.searchInspections()
  },
  computed: {
    ...mapGetters(['inspections']),
    columnTotal() {
      return this.entries.map(row => row.number * row.inspection.price).reduce((acc, cur) => (cur + acc), 0) || ''
    }
  },
  methods: {
    ...mapActions(['searchInspections']),
    handleCreate() {
      this.entries.push(new EntryVO({recordId: this.recordId}))
    },
    handleDelete(index) {
      this.entries.splice(index, 1)
    },
    onSubmitEntries() {
      entryService.addBatch(this.entries.filter(item => delete item._id)).then(results => console.log(results))
    }
  }
}
</script>

<style lang="css">
</style>
