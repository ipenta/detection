<template lang="html">
<div class="container">
  <Breadcrumb :items="breadcrumb"></Breadcrumb>
  <el-row type="flex" :gutter="24" style="margin-top:20px;margin-bottom:20px;">
    <el-col :span="3">
      <span class="textspan">检测项目</span>
    </el-col>
    <el-col :span="10">
      <el-input placeholder="请输入关键字过滤" v-model="principalItem" class="queryinput"></el-input>
    </el-col>
    <el-col :span="3">
      <el-button @click="onSearchInput" style="width:100%;">查询</el-button>
    </el-col>
    <el-col :span="1"><div class="single"></div></el-col>
    <el-col :span="3">
      <router-link :to="{ name: 'principal/form' }" :from="{ name: '/principal'}" class="el-button" style="width:100%;">添加</router-link>
    </el-col>
  </el-row>
  <div style="margin:0 12px;">
    <el-table :data="principals" class="c-table">
      <el-table-column label="委托人" prop="name"></el-table-column>
      <el-table-column label="委托人手机" prop="phonenum"></el-table-column>
      <el-table-column label="操作" fixed="right" width="100">
        <template slot-scope="scope">
          <el-button @click="onCheckDetail(scope.row)" type="text" size="small">查看</el-button>
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
        { label: '委托人管理' },
        { label: '列表' }
      ],
      principalItem: ''
    }
  },
  computed: {
    ...mapGetters(['principals'])
  },
  mounted: function() {
    this.searchPrincipals()
  },
  methods: {
    ...mapActions(['searchPrincipals']),
    onSearchInput: function () {
      this.searchPrincipals({ name: this.principalItem })
    },
    onCheckDetail: row => {
      console.log(row)
    }
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="css">
</style>
