<template lang="html">
<div class="container">
  <Breadcrumb :items="breadcrumb"></Breadcrumb>
  <el-row type="flex" :gutter="24" style="margin-top:20px;margin-bottom:20px;">
    <el-col :span="5">
      <span class="textspan">相关公司项目</span>
    </el-col>
    <el-col :span="10">
      <el-input placeholder="请输入关键字过滤" v-model="unitItem" class="queryinput"></el-input>
    </el-col>
    <el-col :span="3">
      <el-button @click="onSearchInput" style="width:100%;">查询</el-button>
    </el-col>
    <el-col :span="1"><div class="single"></div></el-col>
    <el-col :span="3">
      <router-link :to="{ name: 'entity/form' }" :from="{ name: '/entity'}" class="el-button" style="width:100%;">添加</router-link>
    </el-col>
  </el-row>
  <div style="margin:0 12px;">
    <el-table :data="entities" class="c-table">
      <el-table-column label="单位类型" prop="type" width="160"></el-table-column>
      <el-table-column label="单位名称" prop="name"></el-table-column>
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
        { label: '相关单位管理' },
        { label: '列表' }
      ],
      unitItem: ''
    }
  },
  computed: {
    ...mapGetters(['entities'])
  },
  mounted: function() {
    this.searchEntities()
  },
  methods: {
    ...mapActions(['searchEntities']),
    onSearchInput: function () {
      this.searchEntities({ name: this.unitItem })
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
