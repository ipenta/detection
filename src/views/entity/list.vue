<template lang="html">
<div class="container">
  <Breadcrumb :items="breadcrumb"></Breadcrumb>
  <el-row type="flex" :gutter="24" style="margin-top:20px;margin-bottom:20px;">
    <el-col :span="5">
      <span class="textspan">相关公司项目</span>
    </el-col>
    <el-col :span="10">
      <el-input placeholder="请输入关键字过滤" v-model="searchValue" class="queryinput"></el-input>
    </el-col>
    <el-col :span="3">
      <el-button @click="onSearch" style="width:100%;">查询</el-button>
    </el-col>
    <el-col :span="1"><div class="single"></div></el-col>
    <el-col :span="3">
      <el-button @click="onCreateItem">添加</el-button>
      <!-- <router-link :to="{ name: 'entity/form' }" :from="{ name: '/entity'}" class="el-button" style="width:100%;">添加</router-link> -->
    </el-col>
  </el-row>
  <div style="margin:0 12px;">
    <el-table :data="list" class="c-table">
      <el-table-column label="单位名称" prop="name"></el-table-column>
      <el-table-column label="操作" fixed="right" width="100">
        <template slot-scope="scope">
          <el-button @click="onRemoveItem(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="onShowItem(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog title="委托单" :visible.sync="dialogFormVisible" style="width:100%" v-if='dialogFormVisible'>
    <EntityForm :content="content" @close="onClose" v-if='dialogFormVisible'></EntityForm>
  </el-dialog>
</div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import EntityForm from './EntityForm'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      content: {},
      dialogFormVisible: false,
      breadcrumb: [
        { label: '相关单位管理' },
        { label: '列表' }
      ],
      searchValue: ''
    }
  },
  computed: {
    ...mapGetters({
      list: 'entity/list'
    })
  },
  mounted: function() {
    this.search()
  },
  methods: {
    ...mapActions({
      search: 'entity/search',
      remove: 'entity/remove'
    }),
    onSearch: function () {
      if (this.searchValue !== '') {
        this.search({ name: this.searchValue })
      }
    },
    onCreateItem: function () {
      this.dialogFormVisible = true
      this.content = {}
    },
    onShowItem: function (row) {
      this.dialogFormVisible = true
      this.content = row
      // this.queryDetail({ id: row._id })
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
    Breadcrumb,
    EntityForm
  }
}
</script>

<style lang="css">
</style>
