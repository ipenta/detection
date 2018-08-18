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
      <el-table-column label="建设单位" prop="owner.name"></el-table-column>
      <el-table-column label="监理单位" prop="supervisor.name"></el-table-column>
      <el-table-column label="施工单位" prop="builder.name"></el-table-column>
      <el-table-column label="设计单位" prop="designer.name"></el-table-column>
      <el-table-column label="操作" fixed="right" width="100">
        <template slot-scope="scope">
          <el-button @click="onRemoveItem(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="onShowItem(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- <el-dialog title="委托单" :visible.sync="dialogFormVisible" style="width:100%" v-if='dialogFormVisible'>
    <ProjectForm :content="content" @close="onClose" v-if='dialogFormVisible'></ProjectForm>
  </el-dialog> -->
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
  mounted: function () {
    this.searchProject()
  },
  computed: {
    ...mapGetters({projects: 'project/projects'})
  },
  methods: {
    ...mapActions({
      searchProject: 'project/searchProject',
      removeProject: 'project/removeProject'
    }),
    onSearchInput: function () {
      this.searchProject({ name: this.projectItem })
    },
    onShowItem: function (row) {
      // this.dialogFormVisible = true
      this.$router.push({ name: 'project/form', query: {id: row._id} })
    },
    onRemoveItem: function (row) {
      const that = this
      this.removeProject({id: row._id}).then(result => {
        that.searchProject()
      })
    },
    onClose: function () {
      this.dialogFormVisible = false
      this.searchProject()
    }
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="css">
</style>
