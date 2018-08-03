<template lang="html">
<div class="container">
  <Breadcrumb :items="breadcrumb"></Breadcrumb>
  <div style="margin:0 12px;">
    <div class="detail">
      <el-form label-position="left" inline class="table-expand">
        <!-- <el-form-item label="委托方案">
          <span>{{ props.row.title }}</span>
        </el-form-item>
        <el-form-item label="所属工程">
          <span>{{ props.row.project.name }}</span>
        </el-form-item>
        <el-form-item label="委托单位">
          <span>{{ props.row.entity.name }}</span>
        </el-form-item>
        <el-form-item label="委托人">
          <span>{{ props.row.principal.name }}</span>
        </el-form-item>
        <el-form-item label="委托人电话">
          <span>{{ props.row.principal.phonenum }}</span>
        </el-form-item> -->
        <br>
      </el-form>
    </div>
    <!--
    <el-row type="flex" :gutter="24" style="margin-top:20px;margin-bottom:20px;">

      <el-col :span="10">
        <el-input placeholder="请输入关键字过滤" v-model="searchInput" class="queryinput"></el-input>
      </el-col>
      <el-col :span="3">
        <el-button @click="getRecords('record')">查询</el-button>
      </el-col>
      <el-col :span="1"><div class="single"></div></el-col>
      <el-col :span="4">
        <el-button @click="handleCreate">添加新明细</el-button>
        <router-link :to="{ name: 'record/form', params:{ id: id } }" class="el-button">添加新方案</router-link>
      </el-col>
      <el-col :span="4">
        <el-button>添加新检测项</el-button>
         <router-link :to="{ name: 'record/form', params:{ id: id } }" class="el-button">添加新方案</router-link>
      </el-col>
    </el-row>
    <el-table :data="data" style="width: 100%;">
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
      <el-button size="mini" type="danger" style="float:right;margin:10px 10px 0 0;">确认</el-button>
    </div> -->
  </div>
  {{record}}
</div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import EntryVO from '@/service/model/EntryVO'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      breadcrumb: [
        { label: '订单管理' },
        { label: '列表' }
      ],
      orderId: this.$route.params.id,
      loading: false,
      data: [{
        inspection: {
          text: ''
        },
        number: ''
      }],
      manufacturer: {},
      manufacturers: [{
        _id: '3333',
        name: 'djfjfjff'
      }]
    }
  },
  mounted: function() {
    this.getRecordDetail(this.$route.params)
    this.searchInspections()
  },
  computed: {
    ...mapGetters(['inspections', 'record']),
    columnTotal() {
      return this.data.map(row => row.number * row.inspection.price).reduce((acc, cur) => (cur + acc), 0) || ''
    }
  },
  methods: {
    ...mapActions(['searchInspections', 'getRecordDetail']),
    getTableData() {
      console.log('---')
    },
    onSearchInspection() {
      console.log('inspect')
    },
    handleCreate() {
      this.data.push(new EntryVO())
    },
    handleDelete(index, rows) {
      rows.splice(index, 1)
    }
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="css">
.detail .el-form-item{
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
