<template lang="html">
<div class="container">
  <Breadcrumb :items="breadcrumb"></Breadcrumb>
  <el-row type="flex" :gutter="24" style="margin-top:20px;margin-bottom:20px;">
    <el-col :span="3">
      <span class="textspan">检测项目</span>
    </el-col>
    <el-col :span="10">
      <el-input placeholder="请输入关键字过滤" v-model="searchValue" class="queryinput"></el-input>
    </el-col>
    <el-col :span="3">
      <el-button @click="onSearch" style="width:100%;">查询</el-button>
    </el-col>
    <el-col :span="1"><div class="single"></div></el-col>
    <el-col :span="3">
      <el-button @click="onCreate">添加</el-button>
      <!-- <router-link :to="{ name: 'principal/form' }" :from="{ name: '/principal'}" class="el-button" style="width:100%;">添加</router-link> -->
    </el-col>
  </el-row>
  <div style="margin:0 12px;">
    <el-table :data="list" class="c-table">
      <el-table-column label="委托人" prop="name"></el-table-column>
      <el-table-column label="委托人手机" prop="phonenum"></el-table-column>
      <el-table-column label="操作" fixed="right" width="100">
        <template slot-scope="scope">
          <el-button @click="onRemove(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="onShowDetail(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog title="委托单" :visible.sync="dialogFormVisible" style="width:100%" v-if='dialogFormVisible'>
    <PrincipalForm :content="content" @close="onClose" v-if='dialogFormVisible'></PrincipalForm>
  </el-dialog>
</div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import PrincipalForm from './PrincipalForm'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      content: {},
      dialogFormVisible: false,
      breadcrumb: [
        { label: '委托人管理' },
        { label: '列表' }
      ],
      searchValue: ''
    }
  },
  computed: {
    ...mapGetters({
      list: 'principal/list'
    })
  },
  mounted: function() {
    this.search()
  },
  methods: {
    ...mapActions({
      search: 'principal/search',
      remove: 'principal/remove'
    }),
    onSearch: function () {
      this.search({ name: this.searchValue })
    },
    onCreate: function () {
      this.dialogFormVisible = true
      this.content = {}
    },
    onShowDetail: function (row) {
      this.dialogFormVisible = true
      this.content = row
      // this.queryDetail({ id: row._id })
    },
    onRemove: function (row) {
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
    Breadcrumb,
    PrincipalForm
  }
}
</script>

<style lang="css">
</style>
