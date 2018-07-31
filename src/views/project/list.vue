<template lang="html">
<div class="container">
  <Breadcrumb :items="breadcrumb"></Breadcrumb>
  <el-row type="flex" :gutter="24" style="margin-top:20px;margin-bottom:20px;">
    <el-col :span="5">
      <span class="textspan">项目</span>
    </el-col>
    <el-col :span="10">
      <el-input placeholder="请输入关键字过滤" v-model="projectItem" class="queryinput"></el-input>
    </el-col>
    <el-col :span="3">
      <el-button @click="onSearchInput" style="width:100%;">查询</el-button>
    </el-col>
    <el-col :span="1"><div class="single"></div></el-col>
    <el-col :span="3">
      <router-link :to="{ name: 'project/form' }" :from="{ name: 'project'}" class="el-button" style="width:100%;">添加</router-link>
    </el-col>
  </el-row>
  <div style="margin:0 12px;">
    <el-table :data="projects" class="c-table">
      <el-table-column label="项目名称" prop="name" width="160"></el-table-column>
      <el-table-column label="建设单位" prop="entities[0].name"></el-table-column>
      <el-table-column label="监理单位" prop="entities[1].name"></el-table-column>
      <el-table-column label="施工单位" prop="entities[2].name"></el-table-column>
      <el-table-column label="设计单位" prop="entities[3].name"></el-table-column>
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
        { label: '工程管理' },
        { label: '列表' }
      ],
      projectItem: ''
    }
  },
  computed: {
    ...mapGetters(['projects'])
  },
  mounted: function () {
    this.searchProjects()
  },
  methods: {
    ...mapActions(['searchProjects']),
    onSearchInput: function () {
      this.searchProjects({ name: this.projectItem })
    }
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="css">
</style>
