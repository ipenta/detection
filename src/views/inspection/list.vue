<template lang="html">
<div class="container">
  <Breadcrumb :items="breadcrumb"></Breadcrumb>
  <el-row type="flex" :gutter="24" style="margin-top:20px;margin-bottom:20px;">
    <el-col :span="3">
      <span class="textspan">检测项目</span>
    </el-col>
    <el-col :span="10">
      <el-input placeholder="请输入关键字过滤" v-model="queryItem" class="queryinput"></el-input>
    </el-col>
    <el-col :span="3">
      <el-button @click="onSearchInput" style="width:100%;">查询</el-button>
    </el-col>
    <el-col :span="1"><div class="single"></div></el-col>
    <el-col :span="3">
      <router-link :to="{ name: 'inspection/form' }" :from="{ name: '/inspection'}" class="el-button" style="width:100%;">添加</router-link>
    </el-col>
  </el-row>
  <div style="margin:0 12px;">
    <el-table :data="inspections" class="c-table">
      <el-table-column label="检测项名称" prop="text" width="160"></el-table-column>
      <el-table-column label="检测项类型" prop="type" width="160"></el-table-column>
      <el-table-column label="收费标准" prop="price"></el-table-column>
      <el-table-column label="计件单位" prop="unit"></el-table-column>
      <el-table-column label="送样/现场取样" :formatter="methodFormatter"></el-table-column>
      <el-table-column label="操作" fixed="right" width="100">
        <template slot-scope="scope">
          <el-button @click="onRemoveItem(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="onShowItem(scope.row)" type="text" size="small">查看</el-button>
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
        { label: '检测项管理' },
        { label: '列表' }
      ],
      queryItem: ''
    }
  },
  computed: {
    ...mapGetters({
      inspections: 'inspection/inspections'
    })
  },
  mounted: function() {
    this.search()
  },
  methods: {
    ...mapActions({
      search: 'inspection/search',
      remove: 'inspection/remove'
    }),
    methodFormatter: function (row, column) {
      const methods = row.methods
      if (methods instanceof Array) {
        return (methods.length > 0) ? methods.join('，') : ''
      }
    },
    onSearchInput: function () {
      this.search({ text: this.queryItem })
    },
    onShowItem: function (row) {
      // this.dialogFormVisible = true
      this.$router.push({ name: 'inspection/form', query: {id: row._id} })
    },
    onRemoveItem: function (row) {
      const that = this
      this.remove({id: row._id}).then(result => {
        that.search()
      })
    },
    onClose: function () {
      this.dialogFormVisible = false
      this.search()
    }
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="css">
</style>
