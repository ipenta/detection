<template lang="html">
<div class="detail-table">
  <el-row type="flex" :gutter="24" style="margin-top:10px;margin-bottom:10px;">
    <el-col :span="4">
      <el-button size="medium" @click="handleCreateItem">新增检测项目</el-button>
    </el-col>
  </el-row>
  <el-table :data="entries" style="width: 100%;" v-loading="tableloading">
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
    <el-table-column label="价格" width="80px">
      <template slot-scope="scope">
        <span v-show="scope.row.inspection.price !== undefined && scope.row.inspection.unit !== undefined">
        {{scope.row.inspection.price + '/' + scope.row.inspection.unit || ''}}
        </span>
      </template>
    </el-table-column>
    <el-table-column label="检测数量" width="110px">
      <template slot-scope="scope">
        <el-input-number style="width:100px" :min='1' size="small" v-model="scope.row.number"></el-input-number>
      </template>
    </el-table-column>
    <el-table-column prop="summary" label="小计" width="80px">
      <template slot-scope="scope">
        {{scope.row.number * scope.row.inspection.price || ''}}
      </template>
    </el-table-column>

    <el-table-column prop="summary" label="操作" fixed="right" width="150px">
      <template slot-scope="scope">
        <el-button size="mini" v-if="scope.row._id===''" type="primary" @click="handleSaveItem(scope.$index)">保存</el-button>
        <el-button size="mini" v-if="scope.row._id!==''" type="primary" @click="handleSaveItem(scope.$index)">更新</el-button>
        <el-button size="mini" type="danger" @click="handleRemoveItem(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  {{entries}}
  <div class="tfoot">
    <span>总额：{{columnTotal}}</span>
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
      loading: false,
      tableloading: false
    }
  },
  mounted: function() {
    this.searchInspections()
    this.loadEntries()
  },
  computed: {
    ...mapGetters({
      inspections: 'inspection/inspections'
    }),
    columnTotal() {
      return this.entries.map(row => row.number * row.inspection.price).reduce((acc, cur) => (cur + acc), 0) || ''
    }
  },
  methods: {
    ...mapActions({
      searchInspections: 'inspection/search'
    }),
    handleCreateItem: function() {
      this.entries.push(new EntryVO({recordId: this.recordId}))
    },
    handleRemoveItem: function(index) {
      let _entry = this.entries[index]
      if (_entry.recordId === '') {
        this.entries.splice(index, 1)
      } else {
        entryService.remove(_entry).then(results => {
          this.entries.splice(index, 1)
        })
      }
    },
    handleSaveItem: function (index) {
      this.tableloading = true
      entryService.save(this.entries[index]).then(result => {
        if (result.status === 'success') {
          this.$message.success(result.msg)
          this.tableloading = false
        }
      })
    },
    loadEntries: function() {
      this.tableloading = true
      entryService.getEntryByOrderId({recordId: this.recordId}).then(results => {
        this.entries = results
        this.tableloading = false
      })
    }
  }
}
</script>

<style lang="css">
</style>
